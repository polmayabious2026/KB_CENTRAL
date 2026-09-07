const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const commercialoptionSchema = sequelize.define(
  "commercialoptins",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    commercial_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    option: {
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
    tableName: "commercialoptins",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = commercialoptionSchema;
