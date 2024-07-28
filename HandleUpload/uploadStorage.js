const multer = require('multer');
const path = require('path');

//For image
module.exports = function uploadPathStorage (link_storage) {
    return multer.diskStorage({
        // Destination to store image     
        destination: (req, file, cb)=>{ // it is destination not desitnation :)
            cb(null, link_storage);
        }, 
        filename: (req, file, cb) => {
            var lastIndex = file.originalname.lastIndexOf(".")
            var str = file.originalname.substring(0, lastIndex);
            cb(null, str + '_' + Date.now() 
                + path.extname(file.originalname))
                // file.fieldname is name of the field (image)
                // path.extname get the uploaded file extension
        }
    });
}