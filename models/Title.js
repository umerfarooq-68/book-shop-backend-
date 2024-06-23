const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Title = sequelize.define('titles', {
    titleName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author :{
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Title;
