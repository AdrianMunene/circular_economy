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


/*function checkFileType (file, callback){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback('Error Images Only');
    }
};

var storage = multer.diskStorage({
    destination: '../public/images/',
    filename: function (req, file, callback) {
        callback(null, file, fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, callback) {
        checkFiletype(file, callback);
    }
});
*/
/*module.exports = {
    upload,
    storage
};*/






