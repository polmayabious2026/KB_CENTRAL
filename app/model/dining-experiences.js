const {DataTypes}= require("sequelize")
const sequelize = require("../config/dB")

const diningSchema = sequelize.define("dining-experiences",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dining_photo:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_three: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_four: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_five: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_six: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_seven: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_eight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_nine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_ten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandlogo_eleven: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
},{
    tableName:"dining-experiences",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports = diningSchema