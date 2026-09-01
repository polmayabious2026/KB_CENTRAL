const exress = require("express")
const aboutavoragroup = exress.Router()
const upload = require("../middleware/upload")

const {Addaboutavoragroup,Allaboutavoragroup}= require("../controller/aboutavoragroup.con")

aboutavoragroup.post("/add_aboutavoragroup",upload.single("image"),Addaboutavoragroup)
aboutavoragroup.get("/getall_aboutavoragroup",Allaboutavoragroup)


module.exports = aboutavoragroup