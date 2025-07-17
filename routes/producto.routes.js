const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/producto.controller');

router.get('/', ctrl.obtenerProductos);
router.post('/', ctrl.crearProducto);

module.exports = router;
