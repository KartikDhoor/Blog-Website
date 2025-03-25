// multer.js
const multer = require('multer');
 const path = require('path');

// Define storage engine (e.g., for disk storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/image')); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // specify the filename
  }
});

// Initialize the upload variable
const upload = multer({ storage: storage });

module.exports = upload;


