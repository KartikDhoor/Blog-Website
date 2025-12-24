const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadToCloudinary = async (input) => {
    try {
        let result;
        
        // Handle BUFFER (memory storage)
        if (Buffer.isBuffer(input)) {
            result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'uploads' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(input);
            });
        } 
        // Handle FILE PATH (disk storage)
        else if (typeof input === 'string' && fs.existsSync(input)) {
            result = await cloudinary.uploader.upload(input, { folder: 'uploads' });
            fs.unlinkSync(input); // Delete local file
        } 
        else {
            throw new Error('Invalid input: must be Buffer or file path');
        }
        
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Error:', error);
        throw error;
    }
};

module.exports = uploadToCloudinary;
