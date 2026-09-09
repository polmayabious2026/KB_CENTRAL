const {DataTypes}=require("sequelize")
const sequielize = require("../config/dB")

const aboutavoragroup = sequielize.define(
    "aboutavoragroup",{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    banner_image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    first_title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    first_description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    second_title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    second_description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    }
},{
    tableName:"aboutavoragroup",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
});


module.exports = aboutavoragroup