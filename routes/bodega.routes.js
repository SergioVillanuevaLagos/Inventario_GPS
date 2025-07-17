const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bodega.controller');

router.get('/', ctrl.obtenerBodegas);
router.post('/', ctrl.crearBodega);

module.exports = router;
