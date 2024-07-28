const express = require('express');
const router = express.Router();
const controller = require('../Controller/notification.controller');

router.post("/getNotification",controller.getNotification);
router.post("/getNotificationTemplate",controller.getNotificationTemplate);

router.post("/updateNotifyReaded",controller.updateNotifyReaded);
router.post("/addNotification",controller.addNotification);

module.exports = router;