const express = require('express');
const router = express.Router();

const { Storage } = require('../models/index');

// Obtener todas las bodegas
router.get('/', async (req, res) => {
    try {
        const storages = await Storage.findAll();
        res.json(storages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener bodega por id
router.get('/:id', async (req, res) => {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) return res.status(404).json({ error: 'Bodega no encontrada' });
        res.json(storage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nueva bodega
router.post('/', async (req, res) => {
    try {
        const newStorage = await Storage.create(req.body);
        res.status(201).json(newStorage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar bodega por id
router.put('/:id', async (req, res) => {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) return res.status(404).json({ error: 'Bodega no encontrada' });

        await storage.update(req.body);
        res.json(storage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar bodega por id
router.delete('/:id', async (req, res) => {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) return res.status(404).json({ error: 'Bodega no encontrada' });

        await storage.destroy();
        res.json({ message: 'Bodega eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
