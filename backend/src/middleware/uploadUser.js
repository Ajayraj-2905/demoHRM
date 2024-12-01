const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/users')); // Store in "users" folder
    },
    filename: (req, file, cb) => {
        cb(null, `user_${Date.now()}${path.extname(file.originalname)}`); // Unique filename
    }
});

const uploadUser = multer({ storage });

module.exports = uploadUser;
