const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Category extends Model { }

Category.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
},
    { sequelize, ModelName: 'Category' }
);

module.exports = Category;