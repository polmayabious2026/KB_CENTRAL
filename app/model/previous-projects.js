const sequelize = require("../config/dB")
const {DataTypes}=require("sequelize")

const previousprojects = sequelize.define("previousprojects",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
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
    tableName:"previousprojects",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})


module.exports= previousprojects