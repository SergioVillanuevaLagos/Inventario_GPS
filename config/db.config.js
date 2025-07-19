require('dotenv').config();

const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,

    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    logging: false, // Cambia a `console.log` si estás en desarrollo

    timezone: '-04:00', // Puedes ajustar a tu zona horaria (por ejemplo Chile)

    define: {
        underscored: true,       // usa snake_case en los nombres de columnas
        freezeTableName: true,   // evita que Sequelize pluralice los nombres
        timestamps: true         // agrega automáticamente createdAt y updatedAt
    },

    dialectOptions: {} // vacío porque no usas SSL
};

module.exports = dbConfig;
