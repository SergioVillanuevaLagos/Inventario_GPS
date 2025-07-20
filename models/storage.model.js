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
            type: DataTypes.STRING, 
            allowNull: false,
            references: {
                model: 'persons', // nombre de la tabla referenciada
                key: 'rut'   // clave primaria de la tabla referenciada
            }
        }
    }, {
        tableName: 'storage',
        timestamps: false
        
    });
};
