const sequelize = require("../config/dB")
const {DataTypes}=require("sequelize")

const ourlegacySchema = sequelize.define("ourlegacy",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    titile:{
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
    tableName:"ourlegacy",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})


module.exports= ourlegacySchema