const router = require('express').Router();
const { upload } = require('./cloudinary.config');
const { uploadImage, deleteImage } = require('./upload.controller');
const { authenticateToken } = require('../../middleware/auth');

// POST /api/upload/image  — accepts a single file in field "image"
router.post('/image', authenticateToken, upload.single('image'), uploadImage);

// DELETE /api/upload/image/:publicId  — delete by Cloudinary public_id
router.delete('/image/:publicId', authenticateToken, deleteImage);

module.exports = router;
