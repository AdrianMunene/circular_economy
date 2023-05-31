const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order');

class Order_Item extends Model { }

Order_Item.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
},
    { sequelize, modelName: 'Order_Item' }
);

module.exports = Order_Item;