//packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
//files

//dotenv for environment variables
var dotenv = require('dotenv').config();

//database connection
var sequelize = require('./config/db');
//models
const User = require('./models/users');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Cart_Item = require('./models/cart-item');
const Order = require('./models/order');
const Order_Item = require('./models/order-item');

//get PORT from .env variables
var PORT = process.env.PORT || 3000;

//indexRouter to hanlde...
var indexRouter = require('./routes/index');
//usersRouter to handle...
var usersRouter = require('./routes/users');
//productRouter to handle...
var productsRouter = require('./routes/products');
//cartRouter
var cartRouter = require('./routes/cart');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public',)));
//** 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);


//line 36 - Not my code
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//relationships
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
//user 1->Many products
User.hasMany(Product);

//user 1->One cart
User.hasOne(Cart);
Cart.belongsTo(User);

//cart many->Many products
Cart.belongsToMany(Product, {
    through: Cart_Item
});
Product.belongsToMany(Cart, {
    through: Cart_Item
});
//order Many->1 users
//order Many->many products
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: Order_Item
});
Product.belongsToMany(Order, {
    through: Order_Item
});

//sync models
sequelize.sync().then(() => {
    console.log('Database schema synchronized succesfully');
}).catch((error) => {
    console.log(error);
});

app.listen(PORT);

module.exports = app;