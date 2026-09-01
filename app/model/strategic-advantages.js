const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const strategicSchema = sequelize.define(
  "strategic-advantages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    advantages_one: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advantages_two: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advantages_three: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advantages_four: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advantages_five: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advantages_six: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  {
    tableName: "strategic-advantages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = strategicSchema;
