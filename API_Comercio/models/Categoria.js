// models/Categoria.js
const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidadProductos: { type: Number, required: true },
  imagen: { type: String, default: null }, // La imagen será una URL o la ruta de la imagen en el servidor
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
