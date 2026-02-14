const prisma = require('../../../src/db/mysqlCient');

/**
 * Generate smart notifications based on plant care schedules
 */
function generateNotifications(plants) {
    const notifications = [];
    const now = new Date();

    plants.forEach(plant => {
        if (!plant.plantSpecies) return;

        const speciesName = plant.plantSpecies.common_name;
        const nickname = plant.nickname || speciesName;

        // Water notifications
        if (plant.lastWatered) {
            const daysSinceWatering = Math.floor((now - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24));

            // Parse watering frequency from care instructions
            const waterCare = plant.plantSpecies.care_water;
            let wateringInterval = 7; // default 1 week

            try {
                const careData = typeof waterCare === 'string' ? JSON.parse(waterCare) : waterCare;
                if (careData.frequency) {
                    // Extract number from frequency like "2-3 Weeks" or "Every 5 Days"
                    const match = careData.frequency.match(/(\d+)/);
                    if (match) {
                        wateringInterval = parseInt(match[1]);
                        if (careData.frequency.toLowerCase().includes('week')) {
                            wateringInterval *= 7;
                        }
                    }
                }
            } catch (e) {
                // Use default interval
            }

            if (daysSinceWatering >= wateringInterval) {
                notifications.push({
                    id: `water-${plant.id}`,
                    type: 'water',
                    priority: daysSinceWatering > wateringInterval + 3 ? 'urgent' : 'warning',
                    plantId: plant.id,
                    plantName: nickname,
                    gardenName: plant.garden?.name,
                    message: `${nickname} needs watering! Last watered ${daysSinceWatering} days ago.`,
                    icon: 'droplet',
                    timestamp: now
                });
            }
        } else {
            // Never watered
            notifications.push({
                id: `water-new-${plant.id}`,
                type: 'water',
                priority: 'info',
                plantId: plant.id,
                plantName: nickname,
                gardenName: plant.garden?.name,
                message: `Don't forget to set a watering schedule for ${nickname}!`,
                icon: 'droplet',
                timestamp: now
            });
        }

        // Fertilization notifications
        if (plant.lastFertilized) {
            const daysSinceFertilizing = Math.floor((now - new Date(plant.lastFertilized)) / (1000 * 60 * 60 * 24));

            if (daysSinceFertilizing >= 30) { // Default: fertilize monthly
                notifications.push({
                    id: `fertilize-${plant.id}`,
                    type: 'fertilize',
                    priority: daysSinceFertilizing > 45 ? 'warning' : 'info',
                    plantId: plant.id,
                    plantName: nickname,
                    gardenName: plant.garden?.name,
                    message: `${nickname} may need fertilization. Last fertilized ${daysSinceFertilizing} days ago.`,
                    icon: 'sprout',
                    timestamp: now
                });
            }
        }

        // Health status alerts
        if (plant.healthStatus === 'Critical') {
            notifications.push({
                id: `health-critical-${plant.id}`,
                type: 'health',
                priority: 'urgent',
                plantId: plant.id,
                plantName: nickname,
                gardenName: plant.garden?.name,
                message: `${nickname} requires immediate attention! Health status: Critical`,
                icon: 'alert-circle',
                timestamp: now
            });
        } else if (plant.healthStatus === 'NeedsAttention') {
            notifications.push({
                id: `health-warning-${plant.id}`,
                type: 'health',
                priority: 'warning',
                plantId: plant.id,
                plantName: nickname,
                gardenName: plant.garden?.name,
                message: `${nickname} needs some care. Check for issues.`,
                icon: 'alert-triangle',
                timestamp: now
            });
        }
    });

    // Seasonal pest alerts
    const month = now.getMonth();
    const isSpringOrSummer = month >= 2 && month <= 8; // March to September

    if (isSpringOrSummer && plants.length > 0) {
        notifications.push({
            id: 'pest-seasonal',
            type: 'pest',
            priority: 'info',
            message: 'Spring/Summer alert: Check your plants regularly for pests like aphids and spider mites.',
            icon: 'bug',
            timestamp: now
        });
    }

    // Environmental suggestions
    const season = month >= 2 && month <= 4 ? 'spring' :
        month >= 5 && month <= 7 ? 'summer' :
            month >= 8 && month <= 10 ? 'fall' : 'winter';

    const seasonalTips = {
        spring: 'Perfect time for repotting and propagation! Your plants are entering their growth phase.',
        summer: 'Monitor soil moisture closely. Plants may need more frequent watering in the heat.',
        fall: 'Start reducing watering frequency as plants enter dormancy. Great time to prune!',
        winter: 'Most plants need less water and fertilizer. Increase humidity if using indoor heating.'
    };

    notifications.push({
        id: `seasonal-${season}`,
        type: 'environment',
        priority: 'info',
        message: seasonalTips[season],
        icon: 'sun',
        timestamp: now
    });

    // Sort by priority
    const priorityOrder = { urgent: 0, warning: 1, info: 2 };
    return notifications.sort((a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
    );
}

/**
 * Get comprehensive dashboard data for a user
 */
async function getDashboardData(req, res) {
    try {
        const { userId } = req.params;

        console.log('=== Dashboard API Called ===');
        console.log('User ID from params:', userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Fetch user
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        console.log('User found:', user ? user.email : 'NOT FOUND');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Fetch gardens with plant count
        const gardens = await prisma.garden.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { plants: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Found ${gardens.length} gardens for user`);

        // Fetch all user plants with relations
        const plants = await prisma.plant.findMany({
            where: { userId },
            include: {
                garden: true,
                plantSpecies: true
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Found ${plants.length} plants for user`);
        console.log('Plants:', plants.map(p => ({ id: p.id, nickname: p.nickname, species: p.plantSpecies?.common_name })));

        // Generate notifications
        const notifications = generateNotifications(plants);

        // Calculate statistics
        const stats = {
            totalPlants: plants.length,
            totalGardens: gardens.length,
            plantsNeedingCare: notifications.filter(n =>
                n.type === 'water' && (n.priority === 'urgent' || n.priority === 'warning')
            ).length,
            healthyPlants: plants.filter(p => p.healthStatus === 'Good').length,
            plantsNeedingAttention: plants.filter(p =>
                p.healthStatus === 'NeedsAttention' || p.healthStatus === 'Critical'
            ).length
        };

        console.log('Stats:', stats);
        console.log('Notifications count:', notifications.length);
        console.log('=== Sending Response ===');

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                gardens: gardens.map(g => ({
                    id: g.id,
                    name: g.name,
                    description: g.description,
                    plantCount: g._count.plants,
                    createdAt: g.createdAt
                })),
                plants: plants.map(p => ({
                    id: p.id,
                    nickname: p.nickname,
                    location: p.location,
                    healthStatus: p.healthStatus,
                    lastWatered: p.lastWatered,
                    lastFertilized: p.lastFertilized,
                    notes: p.notes,
                    garden: p.garden ? {
                        id: p.garden.id,
                        name: p.garden.name
                    } : null,
                    species: p.plantSpecies ? {
                        id: p.plantSpecies.id,
                        commonName: p.plantSpecies.common_name,
                        scientificName: p.plantSpecies.scientific_name,
                        imageUrl: p.plantSpecies.image_url,
                        family: p.plantSpecies.family
                    } : null,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt
                })),
                notifications,
                stats
            }
        });
    } catch (error) {
        console.error('=== ERROR in Dashboard API ===');
        console.error('Error fetching dashboard data:', error);
        console.error('Stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
}

module.exports = { getDashboardData };
