const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const aboutoptionSchema = sequelize.define(
  "aboutoption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    about_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

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
    tableName: "aboutoption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = aboutoptionSchema;
