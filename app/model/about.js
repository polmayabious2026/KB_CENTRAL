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
    icon: { type: DataTypes.STRING, allowNull: false },
    description: {
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
