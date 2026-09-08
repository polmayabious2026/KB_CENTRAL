const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const keyhighlightpointModel = sequelize.define(
  "keyhighlightpoint",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectvision_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key_highlight_option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cretated_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "keyhighlightpoint",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = keyhighlightpointModel;
