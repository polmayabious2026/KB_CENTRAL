const sequelize = require('../config/dB');
const { DataTypes } = require('sequelize');

const adminSchema = sequelize.define("admin",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    email:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    created_at:{type:DataTypes.DATE},
    updated_at:{type:DataTypes.DATE},
    },{
    tableName:"admin",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
});

module.exports = adminSchema;