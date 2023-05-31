//product model
const Product = require('../models/product');
const { Op } = require('sequelize');

const allProducts = async (req, res) => {
    const searchQuery = req.query.search;
    let searchOptions = {}
    if (searchQuery) {
        searchOptions = {
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `${searchQuery}%` } },
                    { name: searchQuery }
                ]
            }
        };
    }
    try {
        const products = await Product.findAll(searchOptions);
        return res.render('shop', { products });
    } catch (err) {
        console.error(err);
    };
};

const addProduct = async (req, res) => {
    const { name, category, description, price, quantity } = req.body;

    const image = (req.file.path).replace('public', '');

    const UserId = req.user.id;

    if (!name || !category || !description || !price || !quantity || !image) {
        return res.render('sell', { error: 'All fields are required' });
    };

    try {        
        const product = await Product.create({ name, category, description, price, quantity, image, UserId });
        return res.redirect('/products');
        //**res.render('sell', { message: 'Product posted succesfully' });        
    } catch (error) {
        return res.render('sell', { error: error });
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
        
        res.render('product-detail', { product: product });
    } catch (err) {
        return res.render('product-detail', { error: error });
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