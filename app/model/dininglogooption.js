const {DataTypes}= require("sequelize")
const sequelize = require("../config/dB")

const diningLogoSchema = sequelize.define("dininglogos",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    dining_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    brandlogo: {
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
    tableName:"dininglogos",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports = diningLogoSchema