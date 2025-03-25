const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const uploadToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, { folder: 'uploads' });
  
      // Delete the file from local storage after successful upload
      fs.unlinkSync(filePath);
  
      return result.secure_url; // Return Cloudinary image URL
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };
  
  module.exports = uploadToCloudinary;