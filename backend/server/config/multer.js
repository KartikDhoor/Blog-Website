const multer = require('multer');
const uploadToCloudinary = require('./cloudinary');

// 🚀 MEMORY STORAGE (NO files saved to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🚀 DIRECT CLOUDINARY MIDDLEWARE
const uploadToCloudinaryMiddleware = async (req, res, next) => {
  try {
    // ✅ 1. Handle MULTIPLE files (req.files) — used by upload.any() in blog routes
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const cloudUrl = await uploadToCloudinary(file.buffer);
        return {
          fieldname: file.fieldname,
          originalname: file.originalname,
          cloudinaryUrl: cloudUrl,
        };
      });

      req.cloudinaryFiles = await Promise.all(uploadPromises);
      return next();
    }

    // ✅ 2. Handle SINGLE file (req.file) — used by upload.single() in category routes
    if (req.file) {
      const cloudUrl = await uploadToCloudinary(req.file.buffer);
      req.cloudinaryFile = {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        cloudinaryUrl: cloudUrl,
      };
      return next();
    }

    // ✅ 3. No files attached — just continue
    return next();

  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Image upload failed: ' + error.message,
    });
  }
};

module.exports = { upload, uploadToCloudinaryMiddleware };