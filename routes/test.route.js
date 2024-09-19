'use strict'
const express = require('express');
const testController = require('../controllers/test.controller');

const api = express.Router();

api.get('/prueba1', testController.testFunction);
api.get('/prueba2', testController.testFunction2);


module.exports = api;
