const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/companies'))
    },
    filename: (req, file, cb) => {
        cb(null, `company_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadCompany = multer({ storage });

module.exports = uploadCompany;
