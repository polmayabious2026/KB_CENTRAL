const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const projectvisionModel = sequelize.define(
  "project_vission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    banner_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    second_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    second_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    second_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    third_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    third_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    third_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cretated_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "project_vission",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = projectvisionModel;
