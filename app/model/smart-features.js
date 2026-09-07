const sequelize = require("../config/dB.js")
const{DataTypes}=require("sequelize")

const smartfeaturesSchema = sequelize.define("smartfeatures",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    },
},{
    tableName:"smartfeatures",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports=smartfeaturesSchema