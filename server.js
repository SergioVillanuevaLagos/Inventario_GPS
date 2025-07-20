// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
const productoRoutes = require('./routes/product.routes');
const storageRoutes = require('./routes/storage.routes');
const lotRoutes = require('./routes/lot.routes');

app.use('/api/productos', productoRoutes);
app.use('/api/bodegas', storageRoutes);
app.use('/api/lotes', lotRoutes);

// Ruta de prueba
app.get('/hola', (req, res) => {
    res.json({ mensaje: 'Hola mundo' });
});

// Si no es entorno de test, conectarse a DB y levantar servidor
if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate()
        .then(() => {
            console.log('✅ Conexión con PostgreSQL establecida exitosamente');
            // Use different sync strategies based on environment
            const syncOptions = process.env.NODE_ENV === 'development' 
                ? { alter: true }  // Allow alterations in development
                : { force: false, alter: false }; // Don't alter schema in production
            return sequelize.sync(syncOptions);
        })
        .then(() => {
            console.log('📦 Modelos sincronizados con la base de datos');
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
            });
        })
        .catch(err => {
            console.error('❌ Error al conectar con la base de datos:', err);
        });
}

// ✅ Exporta la instancia de Express
module.exports = app;
