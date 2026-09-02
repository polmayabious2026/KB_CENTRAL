const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const aboutSchema = sequelize.define(
  "submenu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // icon: { type: DataTypes.STRING, allowNull: false },
    description_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_3: {
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
    tableName: "about",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = aboutSchema;
