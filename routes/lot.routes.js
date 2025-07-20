const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Op } = require('sequelize');
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

// ✅ Nueva ruta: Alerta de vencimiento de lotes
router.get('/alertas/vencimientos', async (req, res) => {
    const diasParaVencer = parseInt(req.query.dias) || 30; // ?dias=15
    const hoy = moment().startOf('day').toDate();
    const fechaLimite = moment().add(diasParaVencer, 'days').endOf('day').toDate();

    try {
        const lotes = await Lot.findAll({
            where: {
                expirationdate: {
                    [Op.lte]: fechaLimite
                }
            }
        });

        const vencidos = lotes.filter(lote => moment(lote.expirationdate).isBefore(hoy));
        const porVencer = lotes.filter(lote =>
            moment(lote.expirationdate).isSameOrAfter(hoy) &&
            moment(lote.expirationdate).isSameOrBefore(fechaLimite)
        );

        res.json({
            vencidos,
            porVencer,
            total: lotes.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
