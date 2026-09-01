const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const menuSchema = sequelize.define("menu", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    
  },
  created_at:{
    type:DataTypes.DATE
  },
  updated_at:{
    type:DataTypes.DATE
  }
},
{
  tableName:"menu",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"

});

module.exports = menuSchema;
