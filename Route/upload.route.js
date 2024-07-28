var express = require('express');
var router = express.Router();
var controller = require('../Controller/upload.controller');

const postFile = (route_redirect,control) => router.post(route_redirect, control, controller.upload,(error, req, res, next) => {
 res.status(400).json({ error: error.message })
})

const postFileImageAddSuggestion = (route_redirect,control) => router.post(route_redirect, control, controller.uploadSuggestion,(error, req, res, next) => {
    res.status(400).json({ error: error.message })
})

// For Single file upload
postFile('/fileUploadMess',controller.fileUploadMess.single('file'));

// For Single image upload
postFile('/uploadMediaImgMess',controller.imageUploadMess.single('image'));

// For Single image cover upload
postFile('/uploadCoverImg',controller.imageUploadCover.single('image'));

// For Single image cover upload
postFile('/uploadAvatar',controller.imageUploadCover.single('image'));

//For Single image post upload
postFile('/uploadImagePost',controller.fileUploadPost.single('image'))

//For Image Story
postFileImageAddSuggestion('/uploadImageForStory',controller.imageUploadStory.single('image'))

router.post('/removeFile',controller.removeFile);

module.exports = router;