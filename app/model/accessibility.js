const sequelize = require("../config/dB.js")
const{DataTypes}=require("sequelize")

const accessibilitySchema = sequelize.define("accessibility",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    },
    
   
},{
    tableName:"accessibility",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports=accessibilitySchema