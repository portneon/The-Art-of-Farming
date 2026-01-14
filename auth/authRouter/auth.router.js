const authController = require('../authController/auth.controller');


const Router = require('express').Router();

Router.post('/login', authController.login);
Router.post('/register', authController.register);

module.exports = Router;

