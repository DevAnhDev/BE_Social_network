const express = require('express');
const router = express.Router();
const controller = require('../Controller/user.controller');

router.post("/checkUsername",controller.checkUsername);
router.post("/checkEmail",controller.checkEmail);

router.post("/register",controller.register);
router.post("/login",controller.login);
router.post("/loginFace",controller.loginFace);
router.post("/updateFaceId",controller.updateFaceId);
router.post("/getUser",controller.getUser);
router.post("/getFollowers",controller.getFollowers);
router.post("/getFollowings",controller.getFollowings);
router.post("/getFriendById",controller.getFriendById);
router.post("/getInforById",controller.getInforById);
router.post("/getFullInforUserById",controller.getFullInforUserById);

router.post("/updateLastLogin",controller.updateLastLogin);
router.post("/searchUserByName",controller.searchUserByName);
router.post("/getImagePosted",controller.getImagePosted);

module.exports = router;