require('dotenv').config();
const logger = require('../utils/logger');

const dbConfig = {
    HOST: process.env.POSTGRES_HOST || 'localhost',
    USER: process.env.POSTGRES_USER || 'user',
    PASSWORD: process.env.POSTGRES_PASSWORD || 'password',
    DB: process.env.POSTGRES_DB || 'inventory',
    PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: msg => logger ? logger.info(msg) : false,
    timezone: '-04:00',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true
    },
    dialectOptions: {
        ssl: process.env.POSTGRES_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : undefined
    }
};

module.exports = dbConfig;
