const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const walkthroughSchema = sequelize.define(
  "walkthrough",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    video: {
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
    tableName: "walkthrough",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = walkthroughSchema;