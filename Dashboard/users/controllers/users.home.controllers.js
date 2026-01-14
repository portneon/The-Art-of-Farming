function fetchUserPlants(req, res) {
    
    
    res.status(200).json({
        success: true,
        message: 'User plants fetched successfully',
        data: [] 
    });
}

module.exports = fetchUserPlants;

