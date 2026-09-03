const express = require("express")
const admin_router = express.Router()

const{
  AddAdmin,
  LogIn,
  LogOut,
}= require("../controller/admin.con")



admin_router.post("/create_admin",AddAdmin)
admin_router.post("/login_admin",LogIn)






module.exports = admin_router;