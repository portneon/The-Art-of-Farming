const { cloudinary } = require('./cloudinary.config');

/**
 * Upload a single image to Cloudinary
 * POST /api/upload/image
 * Expects multipart/form-data with field name "image"
 */
async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // multer-storage-cloudinary already uploaded the file during middleware
        // req.file contains the Cloudinary response
        const { path: url, filename: publicId } = req.file;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url,
                publicId,
                // Cloudinary auto-generates multiple sizes; return the base URL
                thumbnailUrl: url.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto/')
            }
        });

    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
}

/**
 * Delete an image from Cloudinary
 * DELETE /api/upload/image/:publicId
 * publicId must be URL-encoded if it includes slashes
 */
async function deleteImage(req, res) {
    try {
        const { publicId } = req.params;

        if (!publicId) {
            return res.status(400).json({ success: false, message: 'publicId is required' });
        }

        const result = await cloudinary.uploader.destroy(decodeURIComponent(publicId));

        if (result.result === 'ok' || result.result === 'not found') {
            return res.status(200).json({ success: true, message: 'Image deleted' });
        }

        res.status(400).json({ success: false, message: 'Failed to delete image', result });

    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
}

module.exports = { uploadImage, deleteImage };
