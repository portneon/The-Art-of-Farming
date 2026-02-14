const prisma = require('../../src/db/mysqlCient');

/**
 * Get plant species catalog (original function)
 */
async function getPlants(req, res) {
    try {
        const { search } = req.query;

        const whereClause = search
            ? {
                OR: [
                    {
                        common_name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        scientific_name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
            : {};

        const plants = await prisma.plantSpecies.findMany({
            where: whereClause,
            orderBy: {
                common_name: 'asc'
            }
        });

        res.status(200).json({
            success: true,
            count: plants.length,
            data: plants
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching plants',
            error: error.message
        });
    }
}

/**
 * Get user plant by ID with full details
 */
async function getUserPlant(req, res) {
    try {
        const { plantId } = req.params;

        if (!plantId) {
            return res.status(400).json({
                success: false,
                message: 'Plant ID is required'
            });
        }

        // Fetch plant with all related data
        const plant = await prisma.plant.findUnique({
            where: { id: plantId },
            include: {
                plantSpecies: true,
                garden: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        // Calculate days in garden
        const plantedDate = plant.createdAt;
        const today = new Date();
        const daysInGarden = Math.floor((today - plantedDate) / (1000 * 60 * 60 * 24));

        // Calculate days since watered
        const daysSinceWatered = plant.lastWatered
            ? Math.floor((today - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24))
            : null;

        // Calculate days since fertilized
        const daysSinceFertilized = plant.lastFertilized
            ? Math.floor((today - new Date(plant.lastFertilized)) / (1000 * 60 * 60 * 24))
            : null;

        // Calculate days since botanist visit
        const daysSinceBotanistVisit = plant.botanistVisitDate
            ? Math.floor((today - new Date(plant.botanistVisitDate)) / (1000 * 60 * 60 * 24))
            : null;

        // Build care timeline
        const timeline = [];

        if (plant.lastWatered) {
            timeline.push({
                date: plant.lastWatered,
                type: 'watered',
                note: 'Plant watered',
                daysAgo: daysSinceWatered
            });
        }

        if (plant.lastFertilized) {
            timeline.push({
                date: plant.lastFertilized,
                type: 'fertilized',
                note: 'Plant fertilized',
                daysAgo: daysSinceFertilized
            });
        }

        if (plant.botanistVisitDate) {
            timeline.push({
                date: plant.botanistVisitDate,
                type: 'botanist',
                note: plant.botanistAdvice || 'Botanist consultation',
                daysAgo: daysSinceBotanistVisit
            });
        }

        timeline.push({
            date: plant.createdAt,
            type: 'planted',
            note: 'Plant added to garden',
            daysAgo: daysInGarden
        });

        // Sort timeline by date (newest first)
        timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Build response
        const response = {
            id: plant.id,
            nickname: plant.nickname,
            location: plant.location,
            healthStatus: plant.healthStatus,
            notes: plant.notes,
            daysInGarden,
            plantedDate: plant.createdAt,

            species: plant.plantSpecies ? {
                id: plant.plantSpecies.id,
                commonName: plant.plantSpecies.common_name,
                scientificName: plant.plantSpecies.scientific_name,
                family: plant.plantSpecies.family,
                origin: plant.plantSpecies.origin,
                description: plant.plantSpecies.description,
                imageUrl: plant.plantSpecies.image_url,
                care: {
                    water: typeof plant.plantSpecies.care_water === 'string'
                        ? JSON.parse(plant.plantSpecies.care_water)
                        : plant.plantSpecies.care_water,
                    light: typeof plant.plantSpecies.care_light === 'string'
                        ? JSON.parse(plant.plantSpecies.care_light)
                        : plant.plantSpecies.care_light,
                    humidity: typeof plant.plantSpecies.care_humidity === 'string'
                        ? JSON.parse(plant.plantSpecies.care_humidity)
                        : plant.plantSpecies.care_humidity,
                    temperature: typeof plant.plantSpecies.care_temperature === 'string'
                        ? JSON.parse(plant.plantSpecies.care_temperature)
                        : plant.plantSpecies.care_temperature
                }
            } : null,

            garden: plant.garden ? {
                id: plant.garden.id,
                name: plant.garden.name,
                description: plant.garden.description
            } : null,

            careHistory: {
                lastWatered: plant.lastWatered,
                daysSinceWatered,
                lastFertilized: plant.lastFertilized,
                daysSinceFertilized,
                botanistAdvice: plant.botanistAdvice,
                botanistVisitDate: plant.botanistVisitDate,
                daysSinceBotanistVisit
            },

            timeline,

            user: plant.user
        };

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Error fetching user plant:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching plant details',
            error: error.message
        });
    }
}

/**
 * Update user plant
 */
async function updateUserPlant(req, res) {
    try {
        const { plantId } = req.params;
        const { nickname, location, notes, healthStatus, botanistAdvice, botanistVisitDate } = req.body;

        if (!plantId) {
            return res.status(400).json({
                success: false,
                message: 'Plant ID is required'
            });
        }

        // Check if plant exists
        const existingPlant = await prisma.plant.findUnique({
            where: { id: plantId }
        });

        if (!existingPlant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        // Build update data
        const updateData = {};
        if (nickname !== undefined) updateData.nickname = nickname;
        if (location !== undefined) updateData.location = location;
        if (notes !== undefined) updateData.notes = notes;
        if (healthStatus !== undefined) updateData.healthStatus = healthStatus;
        if (botanistAdvice !== undefined) updateData.botanistAdvice = botanistAdvice;
        if (botanistVisitDate !== undefined) updateData.botanistVisitDate = new Date(botanistVisitDate);

        // Update plant
        const updatedPlant = await prisma.plant.update({
            where: { id: plantId },
            data: updateData,
            include: {
                plantSpecies: true,
                garden: true
            }
        });

        res.status(200).json({
            success: true,
            message: 'Plant updated successfully',
            data: updatedPlant
        });

    } catch (error) {
        console.error('Error updating user plant:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating plant',
            error: error.message
        });
    }
}

module.exports = {
    getPlants,
    getUserPlant,
    updateUserPlant
};
