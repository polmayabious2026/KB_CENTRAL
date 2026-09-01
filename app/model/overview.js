const {DataTypes}=require("sequelize")
const sequielize = require("../config/dB")

const overviewSchema = sequielize.define("overview",{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    bold_title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    }
},{
    tableName:"overview",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
});


module.exports = overviewSchema