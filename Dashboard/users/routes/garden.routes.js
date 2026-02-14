const router = require('express').Router();
const { createGarden, getGardenById, updateGarden, deleteGarden } = require('../controllers/garden.controller');

// Garden routes
router.post('/', createGarden);
router.get('/:gardenId', getGardenById);
router.put('/:gardenId', updateGarden);
router.delete('/:gardenId', deleteGarden);

module.exports = router;
