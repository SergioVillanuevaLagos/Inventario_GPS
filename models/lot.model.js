// models/lot.model.js
module.exports = (sequelize, DataTypes) => {
    const Lot = sequelize.define('lot', {
        lotid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lotnum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expirationdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        storageid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'lot',
        timestamps: false,  // Cambia a true si tienes createdAt/updatedAt en la tabla
    });

    return Lot;
};
