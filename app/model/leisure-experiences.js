const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const leisureSchema = sequelize.define(
  "leisure-experiences",
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
    tableName: "leisure-experiences",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = leisureSchema;
