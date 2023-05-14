const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Cart_Item extends Model { }

Cart_Item.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER }
},
    { sequelize, modelName: 'Cart_Item' }
);

module.exports = Cart_Item;