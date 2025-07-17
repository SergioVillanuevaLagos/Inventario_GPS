const { Lote, Producto, Bodega } = require('../models');

exports.crearLote = async (req, res) => {
    try {
        const nuevo = await Lote.create(req.body);
        res.json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerLotes = async (req, res) => {
    try {
        const lotes = await Lote.findAll({
            include: [Producto, Bodega]
        });
        res.json(lotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
