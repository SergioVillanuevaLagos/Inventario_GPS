const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('storage', {
        storageid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ubicacion: DataTypes.STRING,
        personid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'storage',
        timestamps: false
    });
};
