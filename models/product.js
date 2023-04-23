const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Product extends Model { }

Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.BLOB, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
},
    { sequelize, ModelName: 'Product' }
);

module.exports = Product;