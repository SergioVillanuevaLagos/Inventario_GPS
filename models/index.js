const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions // 👈 Asegúrate de pasar esto
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Importa modelos aquí
db.Product = require("./product.model")(sequelize, DataTypes);

module.exports = db;
