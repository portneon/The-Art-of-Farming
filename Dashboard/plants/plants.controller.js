const prisma = require('../../src/db/mysqlCient');

async function getPlants(req, res) {
    try {
        const { search } = req.query;

        // Build the query based on search parameter
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

module.exports = getPlants;
