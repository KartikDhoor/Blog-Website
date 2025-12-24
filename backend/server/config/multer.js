const multer = require('multer');
const uploadToCloudinary = require('./cloudinary');

// 🚀 MEMORY STORAGE (NO files saved to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🚀 DIRECT CLOUDINARY MIDDLEWARE
const uploadToCloudinaryMiddleware = async (req, res, next) => {
  // ✅ Handle SINGLE file (req.file)
  if (!req.file) return next();

  try {
    const cloudUrl = await uploadToCloudinary(req.file.buffer);
    
    // ✅ Set req.cloudinaryFile (singular) for single file upload
    req.cloudinaryFile = {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      cloudinaryUrl: cloudUrl
    };

    next();
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Image upload failed: ' + error.message 
    });
  }
};

module.exports = { upload, uploadToCloudinaryMiddleware };
