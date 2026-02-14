const router = require('express').Router();
const { getPlants, getUserPlant, updateUserPlant } = require('./plants.controller');

// Plant species catalog
router.get('/', getPlants);

// User plant routes
router.get('/my/:plantId', getUserPlant);
router.put('/my/:plantId', updateUserPlant);

module.exports = router;