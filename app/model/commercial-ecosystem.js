const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const commercialecosystemSchema = sequelize.define(
  "commercial-ecosystem",
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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
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
    option_five: {
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
    tableName: "commercial-ecosystem",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = commercialecosystemSchema;
