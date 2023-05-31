const Cart = require('../models/cart');
const Cart_Item = require('../models/cart-item');
const Product = require('../models/product');

const displayCart = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.render('cart', { loginPrompt: true });
    };

    try {
        const cart = await Cart.findOne({ where: { UserId: req.user.id } });

        const cartitem = await Cart_Item.findAll({ where: { CartId: cart.id } });
        
        const productIds = cartitem.map((item) => item.ProductId);

        const products = await Product.findAll({ where: { id: productIds } });
        
        return res.status(201).render('cart', { products, cartitem });
        //.json({ products });
    } catch (error) {
        return res.status(400).render('cart', { error: error });
        //json({ error: error });
    };
};

const addtoCart = async (req, res, next) => {    
    const { quantity, ProductId } = req.body;

    const user = req.user;

    const product = await Product.findOne({ where: { id: ProductId } });

    if (!user) {
        return res.render('login', { message: 'Login to add items to cart or' });
    };

    const usercart = await Cart.findOne({ where: { UserId: user.id } });
    const CartId = usercart.id;

    if (!quantity) {
        return res.render('product-detail', { product, error: 'Please fill in the quantity field' });
    };

    try {
        const cartitem = await Cart_Item.create({ quantity, CartId, ProductId });
        //implement on orders instead
        /*product.quantity = product.quantity - quantity;
        await product.save();*/

        return res.render('product-detail', { product: product, message: `${quantity}kgs of the ${product.name} have been added to cart` });
        
    } catch (error) {
        if (error.name = 'SequelizeUniqueConstraintError') {
            return res.render('product-detail', { product: product, error: `${product.name}` + ' already exists in your cart. You can visit cart and edit the quantity.' });
        };
        return res.status(400).render('product-detail', { product: product, error: error });
    };
};

const removefromCart = async (req, res) => {
    const { productId } = req.body;
    try {
        const cartitem = Cart_Item.destroy({ where: { ProductId: productId } });
        return res.redirect('/cart');
    } catch (error) {
        console.log(error);
        return res.redirect('/cart');
    }
}

module.exports = {
    displayCart, 
    addtoCart, 
    removefromCart
};