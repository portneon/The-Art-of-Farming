const router = require('express').Router();
const { plantChat } = require('./chat.controller');

// POST /api/chat/plant
router.post('/plant', plantChat);

module.exports = router;
