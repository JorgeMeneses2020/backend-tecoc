'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    nombre: String,
    email: String,
    password: String
});

module.exports = mongoose.model('usuario', userSchema);