const express = require('express');
const router = express.Router();
const inventory = require('../models/inventory');

// Crear inventario
router.post('/save', async (req, res) => {
  try {
    const newInventory = new inventory({
      nombre: req.body.nombre,
      embarcacion: req.body.embarcacion,
      categorias: req.body.categorias
    });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener inventarios
router.get('/list', async (req, res) => {
  try {
    const inventories = await inventory.find().sort({ createdAt: -1 });
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener inventario por ID
router.get('/:id', async (req, res) => {
  try {
    const inv = await inventory.findById(req.params.id);
    res.json(inv);
  } catch (error) {
    res.status(404).json({ message: "Inventario no encontrado" });
  }
});

module.exports = router;