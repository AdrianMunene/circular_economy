const express = require('express');
const router = express.Router();

//middleware
const upload = require('../middleware/fileupload.js');

//
const { me } = require('../controllers/auth');

const { addProduct, addProductCheck, allProducts, productById, productsByCategory } = require('../controllers/product');

router.route('/').get(allProducts);

router.route('/addProduct').get(me, addProductCheck).post(me, upload.single('image'), addProduct);

router.route('/:id').get(productById);

router.route('/category/:category').get(productsByCategory);

module.exports = router;
