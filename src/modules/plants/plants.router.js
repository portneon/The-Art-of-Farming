const router = require('express').Router();
const { upload } = require('../upload/cloudinary.config');
const { authenticateToken } = require('../../middleware/auth');
const {
    getPlants,
    getUserPlant,
    updateUserPlant,
    addPlant,
    deletePlant,
    waterPlant,
    fertilizePlant,
    logBotanistVisit
} = require('./plants.controller');

// Species catalog
router.get('/', getPlants);

// Add a new plant
router.post('/', authenticateToken, upload.single('image'), addPlant);

// User plant routes
router.get('/my/:plantId', authenticateToken, getUserPlant);
router.put('/my/:plantId', authenticateToken, upload.single('image'), updateUserPlant);
router.delete('/my/:plantId', authenticateToken, deletePlant);

// Care action routes
router.post('/my/:plantId/water', authenticateToken, waterPlant);
router.post('/my/:plantId/fertilize', authenticateToken, fertilizePlant);
router.post('/my/:plantId/botanist', authenticateToken, logBotanistVisit);

module.exports = router;
