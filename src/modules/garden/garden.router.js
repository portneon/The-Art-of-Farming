const router = require('express').Router();
const { upload } = require('../upload/cloudinary.config');
const { authenticateToken } = require('../../middleware/auth');
const { createGarden, getGardenById, updateGarden, deleteGarden, getUserGardens } = require('./garden.controller');

// Garden routes
router.get('/', authenticateToken, getUserGardens);
router.post('/', authenticateToken, upload.single('image'), createGarden);
router.get('/:gardenId', authenticateToken, getGardenById);
router.put('/:gardenId', authenticateToken, upload.single('image'), updateGarden);
router.delete('/:gardenId', authenticateToken, deleteGarden);

module.exports = router;

