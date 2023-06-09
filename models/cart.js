const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Cart extends Model { }

Cart.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
},
    { sequelize, modelName: 'Cart' }
);

module.exports = Cart;

