const sequelize = require("../config/dB.js")
const{DataTypes}=require("sequelize")

const smartfeaturesoptionSchema = sequelize.define("smartfeaturesoption",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    smartfeature_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    bulletpoint:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
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
    tableName:"smartfeaturesoption",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports=smartfeaturesoptionSchema