const { Bodega } = require('../models');

exports.crearBodega = async (req, res) => {
    try {
        const nueva = await Bodega.create(req.body);
        res.json(nueva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerBodegas = async (req, res) => {
    try {
        const bodegas = await Bodega.findAll();
        res.json(bodegas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
