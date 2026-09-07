const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const accessorylabeloptionSchema = sequelize.define(
  "accessorylabeloption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accessorylabel_id:{
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
    tableName: "accessorylabeloption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = accessorylabeloptionSchema;
