const {DataTypes}= require("sequelize")
const sequelize = require("../config/dB")

const wellnessSchema = sequelize.define("wellness-spaces",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wellness_background_photo:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
},{
    tableName:"wellness-spaces",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports = wellnessSchema