'use strict'
const express = require('express');
const userController = require('../controllers/usuario.controller');
const api = express.Router();

api.post('/save-usuario', userController.userRegister);
api.post('/login', userController.userLogin);

module.exports = api;