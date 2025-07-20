const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('storage', {
        storageid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        personid: {
            type: DataTypes.STRING(255), 
            allowNull: false,
            references: {
                model: 'persons',
                key: 'rut'
            }
        }
    }, {
        tableName: 'storage',
        timestamps: false,
        freezeTableName: true
    });
};
