const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config'); // ajusta la ruta si es necesario
const logger = require('../utils/logger');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: dbConfig.logging,
        define: dbConfig.define,
        timezone: dbConfig.timezone,
        dialectOptions: dbConfig.dialectOptions
    }
);

const Product = require('./product.model')(sequelize, DataTypes);
const Lot = require('./lot.model')(sequelize, DataTypes);
const Storage = require('./storage.model')(sequelize, DataTypes);

// Solo definir asociaciones si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    Lot.belongsTo(Product, { foreignKey: 'productid', as: 'product' });
    Lot.belongsTo(Storage, { foreignKey: 'storageid', as: 'storage' });
}

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('PostgreSQL Conectado');
        await sequelize.sync();
        logger.info('Tablas de la base de datos sincronizadas');
        return sequelize;
    } catch (error) {
        logger.error(`Error al conectar a PostgreSQL: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDB,
    Product,
    Storage,
    Lot,
};
