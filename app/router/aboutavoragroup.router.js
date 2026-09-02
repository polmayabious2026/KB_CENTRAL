const exress = require("express")
const aboutavoragroup = exress.Router()
const upload = require("../middleware/upload")

const {Addaboutavoragroup,Allaboutavoragroup,Updateaboutavoragroup,Deleteaboutavoragroup}= require("../controller/aboutavoragroup.con")

aboutavoragroup.post("/add_aboutavoragroup",upload.single("image"),Addaboutavoragroup)
aboutavoragroup.get("/getall_aboutavoragroup",Allaboutavoragroup)
aboutavoragroup.put("/update_aboutavoragroup/:id",upload.single("image"),Updateaboutavoragroup)
aboutavoragroup.delete("/delete_aboutavoragroup/:id",Deleteaboutavoragroup)


module.exports = aboutavoragroup