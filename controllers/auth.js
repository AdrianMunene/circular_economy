const User = require('../models/users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const { username, email } = req.body;
    if (!username || !email || !req.body.password) {
        return res.status(400).send('All fields are required');
    };
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!(email.match(emailRegex))) {
        return res.status(400).json({ error: 'Invalid email' });
    };
    //implement password validation with regex /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 
    //and dynamic login page when entering password
    const password = await bcrypt.hash(req.body.password, salt);
    try {
        const user = await User.create({ username, email, password });
        res.redirect('/login')
        //res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }; 
};

const login = async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        const valid_password = await bcrypt.compare(req.body.password, user.password);
        if (valid_password) {
            token = jwt.sign({
                'id': user.id,
                'email': user.email,
                'username': user.username
            }, process.env.SECRET);
            res.status(200).cookie('token', token);
            res.redirect('/products');
        } else {
            res.render('login', { error: 'Incorrect Password' });
        }
    } else {
        res.render('login', { message: 'User does not exist' });
    }
};

const logout = async (req, res, next) => {
    res.status(200).clearCookie('token');
    res.redirect('/products');
};

const me = async (req, res, next) => {
    try {
        /*let token = req.headers['authorization'].split(" ")[1];*/
        let token = req.cookies.token;
        if (!token) {
            req.user = null;
            return next();
        }
        let decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Couldn't authenticate" });
    };
/*    async (req, res, next) => {
        let user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ["password"] } });
        if (user === null) {
            res.status(400).json({ error: 'User not found' });
        }
    };*/
};

const profile = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.render('profile', { loginPrompt: true });
    }
    User.findOne({ where: { id: user.id }, attributes: { exclude: ["password"] } })
        .then((user) => {
            if (!user) {
                return res.render('profile', { accountCreationMessage: true });
            }
            res.render('profile', { user });
        }).catch((error) => {
            res.status(500).json({ error: 'Internal server error' });
        });
};

module.exports =
{
    register,
    login,
    logout,
    profile,
    me,
}