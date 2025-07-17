const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

// Cargar variables de entorno
dotenv.config();

// Rutas
const productoRoutes = require('./routes/producto.routes');
const bodegaRoutes = require('./routes/bodega.routes');
const loteRoutes = require('./routes/lote.routes');

// Inicializar app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Usar rutas
app.use('/api/productos', productoRoutes);
app.use('/api/bodegas', bodegaRoutes);
app.use('/api/lotes', loteRoutes);

// Conectar y lanzar servidor
sequelize.sync().then(() => {
    console.log('📦 Base de datos sincronizada');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT || 3000}`);
    });
});
