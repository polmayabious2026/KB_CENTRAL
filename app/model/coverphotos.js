const { DataTypes } = require("sequelize");
const sequelize = require("../config/dB");

const coverphotoSchema = sequelize.define("coverphoto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bold_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at:{
    type:DataTypes.DATE
  },
  updated_at:{
    type:DataTypes.DATE
  }
},
{
  tableName:"coverphoto",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"

}
);

module.exports = coverphotoSchema;
