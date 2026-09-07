const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const globalfashionoptionSchema = sequelize.define(
  "globalfashionoption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    global_fashion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_image: {
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
    tableName: "globalfashionoption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = globalfashionoptionSchema;
