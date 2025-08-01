const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('product', {
        productid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: DataTypes.STRING,
        meassure: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'product',
        timestamps: false
    });
};
