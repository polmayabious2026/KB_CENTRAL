const sequelize = require("../config/dB")
const {DataTypes}= require("sequelize")


const contactSchema = sequelize.define("contact",{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone_no:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    alternate_email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        
    },
    updated_at:{
        type:DataTypes.DATE,
        
    },
},{
    tableName:"contact",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

module.exports = contactSchema