const {DataTypes}=require("sequelize")
const sequielize = require("../config/dB")

const parking = sequielize.define(
    "parking",{
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
    tableName:"parking",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
});


module.exports = parking