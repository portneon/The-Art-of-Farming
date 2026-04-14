const prisma = require('../../db/prismaClient');
const { cloudinary } = require('../upload/cloudinary.config');

/**
 * Get plant species catalog
 * GET /plants?search=&family=
 */
async function getPlants(req, res) {
    try {
        const { search, family } = req.query;

        const conditions = [];
        if (search) {
            conditions.push({
                OR: [
                    { common_name: { contains: search, mode: 'insensitive' } },
                    { scientific_name: { contains: search, mode: 'insensitive' } }
                ]
            });
        }
        if (family) {
            conditions.push({ family: { contains: family, mode: 'insensitive' } });
        }

        const whereClause = conditions.length > 0 ? { AND: conditions } : {};

        const plants = await prisma.plantSpecies.findMany({
            where: whereClause,
            orderBy: { common_name: 'asc' }
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
 * GET /plants/my/:plantId
 */
async function getUserPlant(req, res) {
    try {
        const { plantId } = req.params;

        if (!plantId) {
            return res.status(400).json({ success: false, message: 'Plant ID is required' });
        }

        const plant = await prisma.plant.findUnique({
            where: { id: plantId },
            include: {
                plantSpecies: true,
                garden: true,
                user: { select: { id: true, name: true, email: true } }
            }
        });

        if (!plant) {
            return res.status(404).json({ success: false, message: 'Plant not found' });
        }

        const today = new Date();
        const daysInGarden = Math.floor((today - new Date(plant.createdAt)) / (1000 * 60 * 60 * 24));
        const daysSinceWatered = plant.lastWatered
            ? Math.floor((today - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24)) : null;
        const daysSinceFertilized = plant.lastFertilized
            ? Math.floor((today - new Date(plant.lastFertilized)) / (1000 * 60 * 60 * 24)) : null;
        const daysSinceBotanistVisit = plant.botanistVisitDate
            ? Math.floor((today - new Date(plant.botanistVisitDate)) / (1000 * 60 * 60 * 24)) : null;

        const timeline = [];
        if (plant.lastWatered) timeline.push({ date: plant.lastWatered, type: 'watered', note: 'Plant watered', daysAgo: daysSinceWatered });
        if (plant.lastFertilized) timeline.push({ date: plant.lastFertilized, type: 'fertilized', note: 'Plant fertilized', daysAgo: daysSinceFertilized });
        if (plant.botanistVisitDate) timeline.push({ date: plant.botanistVisitDate, type: 'botanist', note: plant.botanistAdvice || 'Botanist consultation', daysAgo: daysSinceBotanistVisit });
        timeline.push({ date: plant.createdAt, type: 'planted', note: 'Plant added to garden', daysAgo: daysInGarden });
        timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

        const parseCare = (val) => {
            if (!val) return val;
            try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return val; }
        };

        const response = {
            id: plant.id,
            nickname: plant.nickname,
            location: plant.location,
            imageUrl: plant.imageUrl,
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
                    water: parseCare(plant.plantSpecies.care_water),
                    light: parseCare(plant.plantSpecies.care_light),
                    humidity: parseCare(plant.plantSpecies.care_humidity),
                    temperature: parseCare(plant.plantSpecies.care_temperature)
                }
            } : null,
            garden: plant.garden ? { id: plant.garden.id, name: plant.garden.name, description: plant.garden.description } : null,
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

        res.status(200).json({ success: true, data: response });

    } catch (error) {
        console.error('Error fetching user plant:', error);
        res.status(500).json({ success: false, message: 'Error fetching plant details', error: error.message });
    }
}

async function updateUserPlant(req, res) {
    try {
        const { plantId } = req.params;
        const { nickname, location, notes, healthStatus, botanistAdvice, botanistVisitDate } = req.body;

        if (!plantId) {
            return res.status(400).json({ success: false, message: 'Plant ID is required' });
        }

        const existingPlant = await prisma.plant.findUnique({ where: { id: plantId } });
        if (!existingPlant) {
            return res.status(404).json({ success: false, message: 'Plant not found' });
        }

        // Handle image upload
        let imageUrl = existingPlant.imageUrl;
        if (req.file) {
            // Delete old image if exists
            if (existingPlant.imageUrl) {
                const publicId = existingPlant.imageUrl.split('/').pop().split('.')[0]; // Extract public_id from URL
                try {
                    await cloudinary.uploader.destroy(`the-art-of-farming/plants/${publicId}`);
                } catch (error) {
                    console.warn('Failed to delete old image:', error);
                }
            }
            imageUrl = req.file.path;
        }

        const updateData = { imageUrl };
        if (nickname !== undefined) updateData.nickname = nickname;
        if (location !== undefined) updateData.location = location;
        if (notes !== undefined) updateData.notes = notes;
        if (healthStatus !== undefined) updateData.healthStatus = healthStatus;
        if (botanistAdvice !== undefined) updateData.botanistAdvice = botanistAdvice;
        if (botanistVisitDate !== undefined) updateData.botanistVisitDate = new Date(botanistVisitDate);

        const updatedPlant = await prisma.plant.update({
            where: { id: plantId },
            data: updateData,
            include: { plantSpecies: true, garden: true }
        });

        res.status(200).json({ success: true, message: 'Plant updated successfully', data: updatedPlant });

    } catch (error) {
        console.error('Error updating user plant:', error);
        res.status(500).json({ success: false, message: 'Error updating plant', error: error.message });
    }
}


async function addPlant(req, res) {
    try {
        const { userId, gardenId, species, nickname, location, notes, waterFrequency, lightRequirement } = req.body;

        if (!userId || !gardenId || !species) {
            return res.status(400).json({
                success: false,
                message: 'userId, gardenId, and species are required'
            });
        }

        // Verify user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // Verify garden belongs to user
        const garden = await prisma.garden.findFirst({ where: { id: gardenId, userId } });
        if (!garden) return res.status(404).json({ success: false, message: 'Garden not found or does not belong to user' });

        // Look up species by common name (case-insensitive)
        const plantSpecies = await prisma.plantSpecies.findFirst({
            where: { common_name: { equals: species.trim(), mode: 'insensitive' } }
        });

        if (!plantSpecies) {
            return res.status(404).json({
                success: false,
                message: `Species "${species}" not found in the catalog. Please search in the Botanical Catalog to find the exact name.`
            });
        }

        // Append care preferences to notes
        let enrichedNotes = notes || '';
        if (waterFrequency) enrichedNotes += (enrichedNotes ? '\n' : '') + `Water frequency: ${waterFrequency}`;
        if (lightRequirement) enrichedNotes += (enrichedNotes ? '\n' : '') + `Light requirement: ${lightRequirement}`;

        const plant = await prisma.plant.create({
            data: {
                userId,
                gardenId,
                plantSpeciesId: plantSpecies.id,
                nickname: nickname?.trim() || null,
                location: location?.trim() || null,
                imageUrl: req.file ? req.file.path : null,
                healthStatus: 'Good',
                notes: enrichedNotes || null
            },
            include: { plantSpecies: true, garden: true }
        });

        res.status(201).json({
            success: true,
            message: 'Plant added successfully',
            data: {
                id: plant.id,
                nickname: plant.nickname,
                location: plant.location,
                imageUrl: plant.imageUrl,
                healthStatus: plant.healthStatus,
                notes: plant.notes,
                species: {
                    id: plant.plantSpecies.id,
                    commonName: plant.plantSpecies.common_name,
                    scientificName: plant.plantSpecies.scientific_name,
                    imageUrl: plant.plantSpecies.image_url,
                    family: plant.plantSpecies.family
                },
                garden: { id: plant.garden.id, name: plant.garden.name },
                createdAt: plant.createdAt
            }
        });

    } catch (error) {
        console.error('Error adding plant:', error);
        res.status(500).json({ success: false, message: 'Error adding plant', error: error.message });
    }
}

/**
 * Delete a plant
 * DELETE /plants/my/:plantId
 */
async function deletePlant(req, res) {
    try {
        const { plantId } = req.params;

        const plant = await prisma.plant.findUnique({
            where: { id: plantId },
            include: { plantSpecies: true }
        });
        if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });

        await prisma.plant.delete({ where: { id: plantId } });

        res.status(200).json({
            success: true,
            message: `"${plant.nickname || plant.plantSpecies?.common_name || 'Plant'}" deleted successfully`
        });

    } catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({ success: false, message: 'Error deleting plant', error: error.message });
    }
}

/**
 * Log a watering event — stamps lastWatered = now
 * POST /plants/my/:plantId/water
 */
async function waterPlant(req, res) {
    try {
        const { plantId } = req.params;

        const plant = await prisma.plant.findUnique({ where: { id: plantId } });
        if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });

        const updated = await prisma.plant.update({
            where: { id: plantId },
            data: { lastWatered: new Date() }
        });

        res.status(200).json({
            success: true,
            message: 'Watering logged successfully',
            data: { lastWatered: updated.lastWatered }
        });

    } catch (error) {
        console.error('Error logging watering:', error);
        res.status(500).json({ success: false, message: 'Error logging watering', error: error.message });
    }
}

/**
 * Log a fertilizing event — stamps lastFertilized = now
 * POST /plants/my/:plantId/fertilize
 */
async function fertilizePlant(req, res) {
    try {
        const { plantId } = req.params;

        const plant = await prisma.plant.findUnique({ where: { id: plantId } });
        if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });

        const updated = await prisma.plant.update({
            where: { id: plantId },
            data: { lastFertilized: new Date() }
        });

        res.status(200).json({
            success: true,
            message: 'Fertilizing logged successfully',
            data: { lastFertilized: updated.lastFertilized }
        });

    } catch (error) {
        console.error('Error logging fertilizing:', error);
        res.status(500).json({ success: false, message: 'Error logging fertilizing', error: error.message });
    }
}

async function logBotanistVisit(req, res) {
    try {
        const { plantId } = req.params;
        const { botanistAdvice, botanistVisitDate } = req.body;

        const plant = await prisma.plant.findUnique({ where: { id: plantId } });
        if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });

        const updated = await prisma.plant.update({
            where: { id: plantId },
            data: {
                botanistAdvice: botanistAdvice || null,
                botanistVisitDate: botanistVisitDate ? new Date(botanistVisitDate) : new Date()
            }
        });

        res.status(200).json({
            success: true,
            message: 'Botanist visit logged successfully',
            data: {
                botanistVisitDate: updated.botanistVisitDate,
                botanistAdvice: updated.botanistAdvice
            }
        });

    } catch (error) {
        console.error('Error logging botanist visit:', error);
        res.status(500).json({ success: false, message: 'Error logging botanist visit', error: error.message });
    }
}

module.exports = {
    getPlants,
    getUserPlant,
    updateUserPlant,
    addPlant,
    deletePlant,
    waterPlant,
    fertilizePlant,
    logBotanistVisit
};
