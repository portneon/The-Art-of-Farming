const prisma = require('../../db/prismaClient');

/**
 * Get dashboard data for a user (gardens summary)
 */
async function getDashboardData(req, res) {
    const { userId } = req.params;
    try {
        const gardens = await prisma.garden.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { plants: true }
                }
            }
        });

        res.status(200).json({
            success: true,
            data: gardens
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
}

module.exports = getDashboardData;
