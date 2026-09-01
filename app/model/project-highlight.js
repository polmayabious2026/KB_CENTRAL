const {DataTypes}=require("sequelize")
const sequielize = require("../config/dB")

const projecthighlightSchema = sequielize.define(
    "project-highlight",{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    bold_title:{
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
    tableName:"project-highlight",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
});


module.exports = projecthighlightSchema