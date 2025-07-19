const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Importar modelos y conexión
const db = require('./models');
const sequelize = db.sequelize;

// Verificar conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexión con PostgreSQL establecida exitosamente');

        // Sincronizar modelos con la base de datos
        return sequelize.sync(); // O usa { force: true } solo si deseas resetear las tablas
    })
    .then(() => {
        console.log('📦 Base de datos sincronizada');

        // Iniciar servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la base de datos por :', err);
    });

// Rutas
const productoRoutes = require('./routes/product.routes');
app.use('/api/productos', productoRoutes);
