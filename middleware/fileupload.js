const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
});

module.exports = upload;







