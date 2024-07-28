const express = require('express');
const router = express.Router();
const controller = require('../Controller/messenges.controller');

router.post("/getMessengesByIdRoom",controller.getMessengesByIdRoom);
router.post("/getListCovensation",controller.getListCovensation);
router.post("/getRoomCurrent",controller.getRoomCurrent);
router.post("/addMessenger",controller.addMessenger);
router.post("/getReciver",controller.getReciver);

router.post("/checkRoomExist",controller.checkRoomExist);
router.post("/createRoomSolo",controller.createRoomSolo);
router.post("/createRoomGroup",controller.createRoomGroup);
router.post("/renameRoomById",controller.renameRoomById);

module.exports = router;