const express = require('express');
const router = express.Router();

//middleware
const upload = require('../middleware/fileupload.js');

//
const { me } = require('../controllers/auth');

const { addProduct, addProductCheck, allProducts, productById, productsByCategory } = require('../controllers/product');


router.route('/').get(allProducts)


router.route('/addProduct').get(me, addProductCheck);
router.route('/addProduct').post(upload.single('image'), addProduct);


router.route('/:id').get(productById);


router.route('/category/:category').get(productsByCategory);

module.exports = router;
















/*router.get('/shop', shop);

router.get('/sell', (req, res) => {
    res.render('sell');
});

router.post('/sell', upload.single('image'), sell);*/