const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const brandLogoSchema = sequelize.define(
  "brandlogooption",
  { id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brnad_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    option_logo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "brandlogooption",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = brandLogoSchema;
