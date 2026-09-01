const {Sequelize}= require("sequelize")

const sequelize = new Sequelize('kbcentral', 'root', '', {
  host: 'localhost',
  dialect: "mysql"
});

sequelize.authenticate()
.then(()=>console.log("Database Connected Successfully"))
.catch((err)=>console.log("Database Connection Failed",err))

module.exports = sequelize; 