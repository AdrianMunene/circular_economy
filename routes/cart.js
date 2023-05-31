//packages
const express = require('express');
const router = express.Router();

const { displayCart, addtoCart, removefromCart } = require('../controllers/cart');
const { productById } = require('../controllers/product');

const { me } = require('../controllers/auth');

router.route('/').get(me, displayCart);

router.route('/addtoCart').post(me, addtoCart);

router.route('/removefromCart').get(removefromCart).post(removefromCart);

module.exports = router;