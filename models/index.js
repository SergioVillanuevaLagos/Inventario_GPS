const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config'); // ajusta la ruta si es necesario

// Crear instancia de Sequelize con tu configuración
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

// Importar modelos y pasar instancia + DataTypes
const Product = require('./product.model')(sequelize, DataTypes);
const Lot = require('./lot.model')(sequelize, DataTypes);
const Storage = require('./storage.model')(sequelize, DataTypes);

// Definir relaciones entre modelos si las hay
Lot.belongsTo(Product, { foreignKey: 'productid', as: 'product' });
Lot.belongsTo(Storage, { foreignKey: 'storageid', as: 'storage' });

// Exportar para usar en otros archivos
module.exports = {
    sequelize,
    Product,
    Storage,
    Lot,
};
