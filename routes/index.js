//packages
const express = require('express');
const router = express.Router();

//controllers
const { register, login, logout, profile, me } = require('../controllers/auth');

router.route('/').get((req, res) => {
    res.render('index');
});


router.route('/register').get((req, res) => {
    res.render('register');
});

router.route('/register').post(register);


router.route('/login').get((req, res) => {
    res.render('login');
});

router.route('/login').post(login);


router.route('/logout').get(logout);


router.route('/profile').get(me, profile);

module.exports = router;
