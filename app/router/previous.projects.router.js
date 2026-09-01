const exress = require("express")
const previousproject = exress.Router()
const upload = require("../middleware/upload")

const {Addpreviousprojects,Allpreviousprojects}= require("../controller/previousprojects.con")

previousproject.post("/add_previousproject",upload.single("image"),Addpreviousprojects)
previousproject.get("/getall_previousproject",Allpreviousprojects)


module.exports = previousproject