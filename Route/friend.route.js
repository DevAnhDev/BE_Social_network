const express = require('express');
const router = express.Router();
const controller = require('../Controller/friend.controller');

router.post("/getFullFriends", controller.getFullFriends);
router.post("/getUserToAddFriend",controller.getUserToAddFriend);
router.post("/addFriend",controller.addFriend);
router.post("/getAddFriendSent",controller.getAddFriendSent);
router.post("/getRequestAddFriend",controller.getRequestAddFriend);

router.post("/notifyThenSendFriend",controller.notifyThenSendFriend);
router.post("/cancelAddFriend",controller.cancelAddFriend);
router.post("/acceptAddFriend",controller.acceptAddFriend);
router.post("/rejectAddFriend",controller.rejectAddFriend);
router.post("/removeFriend",controller.removeFriend);

router.post("/addFollow",controller.addFollow);
router.post("/cancelFollow",controller.cancelFollow);

module.exports = router;    
