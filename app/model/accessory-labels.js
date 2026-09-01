const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const accessorylabelsSchema = sequelize.define(
  "accessory-labels",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bold_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_start: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_three: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_four: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_end: {
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
    tableName: "accessory-labels",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = accessorylabelsSchema;
