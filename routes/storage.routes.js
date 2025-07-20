const express = require('express');
const router = express.Router();
const { Storage, Lot, Product } = require('../models'); // Cambié Batch por Lot

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
        if (req.body.personid) req.body.personid = String(req.body.personid);
        const newStorage = await Storage.create(req.body);
        res.status(201).json(newStorage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar bodega por id
router.put('/:id', async (req, res) => {
    try {
        if (req.body.personid) req.body.personid = String(req.body.personid);
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

// Obtener todos los lotes de una bodega
router.get('/:id/lotes', async (req, res) => {
    const { id } = req.params;

    try {
        const storage = await Storage.findByPk(id);
        if (!storage) {
            return res.status(404).json({ error: 'Bodega no encontrada' });
        }

        const lots = await Lot.findAll({
            where: { storageid: id }, // foreign key en minúscula
            include: [{
                model: Product,
                as: 'product' // alias definido en la asociación
            }]
        });

        res.json({
            bodega: storage.nombre,
            total_lotes: lots.length,
            detalle: lots
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener inventario detallado por producto y lote en una bodega
router.get('/:id/inventario', async (req, res) => {
    const { id } = req.params;

    try {
        const storage = await Storage.findByPk(id);
        if (!storage) return res.status(404).json({ error: 'Bodega no encontrada' });

        const lots = await Lot.findAll({
            where: { storageid: id },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['productid', 'name', 'descripcion', 'meassure', 'type', 'price']
            }],
            order: [['productid', 'ASC']]
        });

        if (lots.length === 0) {
            return res.json({ bodega: storage.nombre, inventario: [] });
        }

        const inventario = {};

        lots.forEach(lot => {
            const prodId = lot.productid;
            if (!inventario[prodId]) {
                inventario[prodId] = {
                    productoId: prodId,
                    nombreProducto: lot.product.name,
                    descripcion: lot.product.descripcion,
                    medida: lot.product.meassure,
                    tipo: lot.product.type,
                    precio: lot.product.price,
                    totalCantidad: 0,
                    lotes: []
                };
            }

            inventario[prodId].totalCantidad += lot.quantity;
            inventario[prodId].lotes.push({
                loteId: lot.lotid,
                cantidad: lot.quantity,
                fechaVencimiento: lot.expirationdate || null,
                estado: lot.status || null // si tienes este campo, si no, puedes eliminarlo
            });
        });

        res.json({
            bodega: storage.nombre,
            inventario: Object.values(inventario)
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
