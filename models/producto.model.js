const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = Schema({
    titulo: String,
    precio: Number,
    descripcion: String,
    stock: Number,
    imagen: String,
    idcategoria: { type: Schema.ObjectId, ref: 'categorias' }
});

module.exports = mongoose.model('productos', productoSchema);

