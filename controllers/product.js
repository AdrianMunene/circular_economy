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
        return res.render('sell', { error: 'All fields are required' });
        //res.status(400).json({success: false, message:'All fields are required'});
    };

    try {
        const product = await Product.create({ name, category, description, price, quantity, image });
        return res.render('sell', { message: 'Product posted succesfully' });
        //status(200).json({ succes: true, message: 'Product posted succesfully' });
    } catch (error) {
        //console.log(err)
        return res.render('sell', { error: error });
        //status(200).json({ success: false, message: 'Error posting product' });
    };
};

const addProductCheck = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.render('sell', { loginPrompt: true });
    }
    res.render('sell', { loggedIn: true });
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
    addProductCheck,
    productById,
    productsByCategory
};