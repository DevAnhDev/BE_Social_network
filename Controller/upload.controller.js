const multer = require('multer');
const fs = require('fs');
const uploadPathStorage = require('../HandleUpload/uploadStorage');

const maxSizeUpload = 10000000;
// For file media messenger
module.exports.fileUploadMess = multer({
  storage: uploadPathStorage('./Upload/messenger/media'),
  limits: {
    fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    cb(undefined, true)
  }
})

// For only image file messenger
module.exports.imageUploadMess = multer({
    storage: uploadPathStorage('./Upload/messenger/image'),
    limits: {
      fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpe|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})

//For image cover
module.exports.imageUploadCover = multer({
  storage: uploadPathStorage('./Upload/cover'),
  limits: {
    fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpe|jpeg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload a Image'))
      }
    cb(undefined, true)
  }
})

//For image avatar
module.exports.imageUploadCover = multer({
  storage: uploadPathStorage('./Upload/avatar'),
  limits: {
    fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpe|jpeg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload a Image'))
      }
    cb(undefined, true)
  }
})

//For image story
module.exports.imageUploadStory = multer({
  storage: uploadPathStorage('./Upload/story'),
  limits: {
    fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpe|jpeg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload a Image'))
      }
    cb(undefined, true)
  }
})

//For post
module.exports.fileUploadPost = multer({
  storage: uploadPathStorage('./Upload/post'),
  limits: {
    fileSize: maxSizeUpload // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    cb(undefined, true)
  }
})

module.exports.upload = (req,res)=>{
  return res.json({msg:req.file})
}

module.exports.uploadSuggestion = (req,res)=>{
  return res.json({msg:req.file})
}

module.exports.removeFile = (req,res)=>{
  const {pathFile} = req.body;
  fs.rmSync(pathFile, {
    force: true,
  });
}