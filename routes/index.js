/*  Register and Login Routes work
    To Do: Redirect to or render user specific page
*/
//packages
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

//database connection
const sequelize = require('../config/db');
const  User  = require('../models/users');
const Product = require('../models/product');
/* GET home page. */
router.get('/', (req, res) =>{
    res.render('index', { title: 'Express' }); //render index, {title: Express}
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const { username, email } = req.body;
    if (!username || !email || !req.body.password) {
        return res.status(400).send('All fields are required');
    };
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!(email.match(emailRegex))) {
        return res.status(400).send('Invalid email');
    };
    //implement password validation with regex /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 
    //and dynamic login page when entering password
    const password = await bcrypt.hash(req.body.password, salt); 
    try {
        const user = await User.create({ username, email, password });
        res.redirect('/login');
        //res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    };
});


router.post('/login', async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        const valid_password = await bcrypt.compare(req.body.password, user.password);
        if (valid_password) {
            token = jwt.sign({
                'id': user.id,
                'email': user.email,
                'username': user.username
            }, process.env.SECRET);
            //res.status(200).json({ token: token });
            res.redirect('/');
        } else {
            res.status(400).json({ error: 'Password Incorrect' });
        }
    } else {
        res.status(404).json({ error: 'User does not exist' });
    }
});

router.get('/me', async (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Couldn't authenticate" });
    }
},
    async (req, res, next) => {
        let user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ["password"] } });
        if (user === null) {
            res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
);
router.get('/shop', (req, res) => {
    res.render('shop')
})
router.get('/sell', (req, res) => {
    res.render('sell');
});

router.post('/sell', async (req, res, next) => {
    const { name, category, description, price, quantity, image } = req.body;
    if (!name || !category || !description || !price ||!quantity || !image) {
        return res.status(400).send('All fields are required');
    };
    try {
        const product = await Product.create({ name, category, description, price, quantity, image });
        res.status(200).send('Product posted succesfully');
    } catch (err) {
        console.log(err)
        res.status(200).send('Error posting product');
    };
});

module.exports = router;

