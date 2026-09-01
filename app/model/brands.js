const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const brandSchema = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brandlogo_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_three: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_four: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_five: {
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
    tableName: "brand",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = brandSchema;
