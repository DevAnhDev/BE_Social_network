const express = require('express');
const router = express.Router();
const controller = require('../Controller/post.controller');

router.post("/getPostById",controller.getPostById);
router.post("/getListLike",controller.getListLike);

router.post("/likePost",controller.likePost);
router.post("/unlikePost",controller.unlikePost);

router.post("/getPostOfUser",controller.getPostOfUser);
router.post("/getCommentByIdPost",controller.getCommentByIdPost);
router.post("/addComment",controller.addComment);
router.post("/addPost",controller.addPost);
router.post("/getPostRealTime",controller.getPostRealTime);

router.post("/sharePost",controller.sharePost);

module.exports = router;