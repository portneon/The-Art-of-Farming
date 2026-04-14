const router = require('express').Router();
const getDashboardData = require('./dashboard.controller');


router.get('/:userId', getDashboardData);


module.exports = router;