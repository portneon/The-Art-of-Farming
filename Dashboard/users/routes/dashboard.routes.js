const router = require('express').Router();
const { getDashboardData } = require('../controllers/dashboard.controller');

// Get comprehensive dashboard data for a user
router.get('/:userId', getDashboardData);

module.exports = router;
