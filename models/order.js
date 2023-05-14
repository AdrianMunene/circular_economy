const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Order extends Model { }

Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, }
},
    { sequelize, modelName: 'Order' }
);

module.exports = Order;