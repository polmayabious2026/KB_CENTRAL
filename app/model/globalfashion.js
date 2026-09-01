const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const globalfashionSchema = sequelize.define(
  "globalfashion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bold_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    option_title_one: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    option_image_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_title_two: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    option_image_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_title_three: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    option_image_three: {
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
    tableName: "globalfashion",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = globalfashionSchema;
