const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  nombre: String,
  embarcacion: String,
  fecha: { 
    type: Date, 
    default: Date.now 
  },
  categorias: [{
    nombre: String,
    items: [{
      nombre: String,
      stockActual: Number,
      stockRequerido: Number,
      necesario: Number,
      observaciones: String
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('inventory', inventorySchema);