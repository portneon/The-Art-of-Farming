const prisma = require('../../../src/db/mysqlCient');

/**
 * Create a new garden for a user
 */
async function createGarden(req, res) {
    try {
        const { userId, name, description } = req.body;

        console.log('=== Create Garden API Called ===');
        console.log('Request body:', { userId, name, description });

        // Validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Garden name is required'
            });
        }

        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Garden name must be 100 characters or less'
            });
        }

        if (description && description.length > 500) {
            return res.status(400).json({
                success: false,
                message: 'Description must be 500 characters or less'
            });
        }

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Create garden
        const garden = await prisma.garden.create({
            data: {
                name: name.trim(),
                description: description?.trim() || null,
                userId
            }
        });

        console.log('Garden created:', garden.id);

        res.status(201).json({
            success: true,
            message: 'Garden created successfully',
            data: {
                id: garden.id,
                name: garden.name,
                description: garden.description,
                plantCount: 0,
                createdAt: garden.createdAt,
                updatedAt: garden.updatedAt
            }
        });
    } catch (error) {
        console.error('Error creating garden:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating garden',
            error: error.message
        });
    }
}

/**
 * Get garden details with all plants
 */
async function getGardenById(req, res) {
    try {
        const { gardenId } = req.params;

        console.log('=== Get Garden API Called ===');
        console.log('Garden ID:', gardenId);

        if (!gardenId) {
            return res.status(400).json({
                success: false,
                message: 'Garden ID is required'
            });
        }

        // Fetch garden with plants
        const garden = await prisma.garden.findUnique({
            where: { id: gardenId },
            include: {
                plants: {
                    include: {
                        plantSpecies: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!garden) {
            return res.status(404).json({
                success: false,
                message: 'Garden not found'
            });
        }

        console.log(`Found garden with ${garden.plants.length} plants`);

        res.status(200).json({
            success: true,
            data: {
                id: garden.id,
                name: garden.name,
                description: garden.description,
                plantCount: garden.plants.length,
                createdAt: garden.createdAt,
                updatedAt: garden.updatedAt,
                user: garden.user,
                plants: garden.plants.map(p => ({
                    id: p.id,
                    nickname: p.nickname,
                    location: p.location,
                    healthStatus: p.healthStatus,
                    lastWatered: p.lastWatered,
                    lastFertilized: p.lastFertilized,
                    notes: p.notes,
                    species: p.plantSpecies ? {
                        id: p.plantSpecies.id,
                        commonName: p.plantSpecies.common_name,
                        scientificName: p.plantSpecies.scientific_name,
                        imageUrl: p.plantSpecies.image_url,
                        family: p.plantSpecies.family
                    } : null,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt
                }))
            }
        });
    } catch (error) {
        console.error('Error fetching garden:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching garden details',
            error: error.message
        });
    }
}

/**
 * Update garden details
 */
async function updateGarden(req, res) {
    try {
        const { gardenId } = req.params;
        const { name, description } = req.body;

        console.log('=== Update Garden API Called ===');
        console.log('Garden ID:', gardenId);
        console.log('Updates:', { name, description });

        if (!gardenId) {
            return res.status(400).json({
                success: false,
                message: 'Garden ID is required'
            });
        }

        // Validation
        if (name && name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Garden name must be 100 characters or less'
            });
        }

        if (description && description.length > 500) {
            return res.status(400).json({
                success: false,
                message: 'Description must be 500 characters or less'
            });
        }

        // Check if garden exists
        const existingGarden = await prisma.garden.findUnique({
            where: { id: gardenId }
        });

        if (!existingGarden) {
            return res.status(404).json({
                success: false,
                message: 'Garden not found'
            });
        }

        // Build update data
        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description?.trim() || null;

        // Update garden
        const updatedGarden = await prisma.garden.update({
            where: { id: gardenId },
            data: updateData,
            include: {
                _count: {
                    select: { plants: true }
                }
            }
        });

        console.log('Garden updated:', updatedGarden.id);

        res.status(200).json({
            success: true,
            message: 'Garden updated successfully',
            data: {
                id: updatedGarden.id,
                name: updatedGarden.name,
                description: updatedGarden.description,
                plantCount: updatedGarden._count.plants,
                createdAt: updatedGarden.createdAt,
                updatedAt: updatedGarden.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating garden:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating garden',
            error: error.message
        });
    }
}

/**
 * Delete a garden
 */
async function deleteGarden(req, res) {
    try {
        const { gardenId } = req.params;

        console.log('=== Delete Garden API Called ===');
        console.log('Garden ID:', gardenId);

        if (!gardenId) {
            return res.status(400).json({
                success: false,
                message: 'Garden ID is required'
            });
        }

        // Check if garden exists
        const garden = await prisma.garden.findUnique({
            where: { id: gardenId },
            include: {
                _count: {
                    select: { plants: true }
                }
            }
        });

        if (!garden) {
            return res.status(404).json({
                success: false,
                message: 'Garden not found'
            });
        }

        // Delete garden (cascade will handle plants)
        await prisma.garden.delete({
            where: { id: gardenId }
        });

        console.log('Garden deleted:', gardenId);

        res.status(200).json({
            success: true,
            message: `Garden deleted successfully. ${garden._count.plants} plants were also removed.`
        });
    } catch (error) {
        console.error('Error deleting garden:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting garden',
            error: error.message
        });
    }
}

module.exports = {
    createGarden,
    getGardenById,
    updateGarden,
    deleteGarden
};
