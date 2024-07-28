const express = require('express');
const router = express.Router();
const controller = require('../Controller/profile.controller');

router.post("/checkFollower",controller.checkFollower);
router.post("/checkFriend",controller.checkFriend);

router.post("/updateCoverImage",controller.updateCoverImage);
router.post("/updateAvatarImage",controller.updateAvatarImage);
module.exports = router;