const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const finediningoptionSchema = sequelize.define(
  "finediningoption",
  {
    id: {
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true,
    },
    finedining_id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
    },
    option_image:{
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
    tableName: "finediningoption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = finediningoptionSchema;
