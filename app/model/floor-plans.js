const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const floorplansSchema = sequelize.define(
  "floor-plans",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    floorimage_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floorimage_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floorimage_three: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floorimage_four: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   floorimage_five: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "floor-plans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = floorplansSchema;
