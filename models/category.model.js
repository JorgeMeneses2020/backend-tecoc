'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    categoria: String,
    descripcion: String
});

module.exports = mongoose.model('categorias', categorySchema);
