const exress = require("express")
const accessibility = exress.Router()
const upload = require("../middleware/upload")

const {Addaccessibility,Allaccessibility}= require("../controller/accessibility.con")

accessibility.post("/add_accessibility",upload.single("image"),Addaccessibility)
accessibility.get("/getall_accessibility",Allaccessibility)


module.exports = accessibility