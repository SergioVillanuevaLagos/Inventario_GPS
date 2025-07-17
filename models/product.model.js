module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Product", {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        meassure: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.BOOLEAN
        },
        price: {
            type: DataTypes.INTEGER
        },
        productTransactionId: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "product",
        timestamps: false
    });
};
