const prisma = require('../../src/db/mysqlCient');

async function getPlants(req, res) {
    try {
        const plants = await prisma.plantSpecies.findMany({take : 6});

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

module.exports = getPlants;
