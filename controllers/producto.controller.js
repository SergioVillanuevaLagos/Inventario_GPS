const { Producto } = require('../models');

exports.crearProducto = async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
