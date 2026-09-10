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
