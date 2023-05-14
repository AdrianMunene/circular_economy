//product model
const Product = require('../models/product');

const allProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        //res.status(200).json({success: true, products});
        //res.status(200).json(products);
        res.render('shop', { products });
    } catch (err) {
        console.error(err);
    };
};

const addProduct = async (req, res) => {
    const { name, category, description, price, quantity } = req.body;

    const image = (req.file.path).replace('public', '');

    if (!name || !category || !description || !price || !quantity || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    };

    try {
        const product = await Product.create({ name, category, description, price, quantity, image });
        res.status(200).json({ succes: true, message: 'Product posted succesfully' });
    } catch (err) {
        console.log(err)
        res.status(200).json({ success: false, message: 'Error posting product' });
    };
};

const productById = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } });
        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, err });
    };
};

const productsByCategory = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { category: req.params.category } });
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
    };
};

module.exports =
{
    allProducts,
    addProduct,
    productById,
    productsByCategory
};