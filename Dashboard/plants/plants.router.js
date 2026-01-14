const router = require('express').Router();
const  getPlants  = require('./plants.controller');

router.get('/', getPlants);

module.exports = router;