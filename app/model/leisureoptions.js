const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const leisureOptionSchema = sequelize.define(
  "leisureoptions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    leisure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    option_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    option_image: {
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
    tableName: "leisureoptions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = leisureOptionSchema;
