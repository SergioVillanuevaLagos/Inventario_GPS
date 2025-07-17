const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/lote.controller');

router.get('/', ctrl.obtenerLotes);
router.post('/', ctrl.crearLote);

module.exports = router;
