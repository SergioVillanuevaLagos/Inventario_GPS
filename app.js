const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Importar modelos
const db = require('./models');
const sequelize = db.sequelize;

// Rutas (ejemplo)
const productoRoutes = require('./routes/product.routes');
app.use('/api/productos', productoRoutes);

// Conectar y levantar servidor
sequelize.sync().then(() => {
    console.log('📦 Base de datos sincronizada');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT || 3000}`);
    });
});
