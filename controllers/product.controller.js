const db = require("../models");
const Product = db.Product;

exports.findAll = async (req, res) => {
    const data = await Product.findAll();
    res.json(data);
};

exports.findById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
};

exports.create = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
};

exports.update = async (req, res) => {
    await Product.update(req.body, { where: { productId: req.params.id } });
    res.json({ message: "Producto actualizado" });
};

exports.delete = async (req, res) => {
    await Product.destroy({ where: { productId: req.params.id } });
    res.json({ message: "Producto eliminado" });
};
