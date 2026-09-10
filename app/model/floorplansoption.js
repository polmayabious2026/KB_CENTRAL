const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const floorplansSchema = sequelize.define(
  "floorplansoption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    floorplans_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floorimage: {
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
    tableName: "floorplansoption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = floorplansSchema;
