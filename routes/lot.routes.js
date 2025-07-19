const express = require('express');
const router = express.Router();

const { Lot } = require('../models/index');

// Obtener todos los lotes
router.get('/', async (req, res) => {
    try {
        const lots = await Lot.findAll();
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener lote por id
router.get('/:id', async (req, res) => {
    try {
        const lot = await Lot.findByPk(req.params.id);
        if (!lot) return res.status(404).json({ error: 'Lote no encontrado' });
        res.json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo lote
router.post('/', async (req, res) => {
    try {
        const newLot = await Lot.create(req.body);
        res.status(201).json(newLot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar lote por id
router.put('/:id', async (req, res) => {
    try {
        const lot = await Lot.findByPk(req.params.id);
        if (!lot) return res.status(404).json({ error: 'Lote no encontrado' });

        await lot.update(req.body);
        res.json(lot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar lote por id
router.delete('/:id', async (req, res) => {
    try {
        const lot = await Lot.findByPk(req.params.id);
        if (!lot) return res.status(404).json({ error: 'Lote no encontrado' });

        await lot.destroy();
        res.json({ message: 'Lote eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
