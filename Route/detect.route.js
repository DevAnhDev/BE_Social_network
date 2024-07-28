const express = require('express');
const router = express.Router();
const controller = require('../Controller/detect.controller');

router.post("/getSuggestion",controller.getSuggestion);

module.exports = router;