const express = require('express');
const productoController = require('../controllers/producto.controller');
const categoryController = require('../controllers/category.controller');
const md_auth = require('../middlewares/authenticated');
const connect = require('connect-multiparty');

const api = express.Router();

var path = connect({ uploadDir: './uploads/productos' })

api.post('/category', md_auth.ensureAuth, categoryController.insertCategory);
api.post('/save-producto', [path, md_auth.ensureAuth], productoController.insertProducto);
api.get('/producto/:id', md_auth.ensureAuth, productoController.getProducto);
api.delete('/producto/:id/:img', productoController.deleteProducto);
api.get('/producto-nombre/:titulo?', productoController.getProductoName);
api.put('/producto-update/:id/:img?', path, productoController.updateProducto);
api.get('/get-imagen/:img', productoController.getImagen);
module.exports = api;