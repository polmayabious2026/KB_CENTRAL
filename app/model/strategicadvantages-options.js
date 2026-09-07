const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const strategicoptionSchema = sequelize.define(
  "strategicoptions",
  {
    strategic_id: {
      type: DataTypes.INTEGER,
       allowNull: false,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  {
    tableName: "strategicoptions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = strategicoptionSchema;
