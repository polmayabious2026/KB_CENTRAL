const sequelize = require("../config/dB")
const {DataTypes}=require("sequelize")

const visionphilosophy = sequelize.define("visionphilosophy",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
    },
    created_at:{
        type:DataTypes.DATE,
    },
    updated_at:{
        type:DataTypes.DATE,
    }
},{
    tableName:"visionphilosophy",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})


module.exports= visionphilosophy