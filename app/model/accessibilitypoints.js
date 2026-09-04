const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const accessibilityPoints = sequelize.define("accessibilitypoints", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  accessibility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  bulletpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = accessibilityPoints;
