const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const amenities = sequelize.define(
  "amenities",
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

    first_image: {
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

    created_at: {
      type: DataTypes.DATE,
    },

    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "amenities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = amenities;
