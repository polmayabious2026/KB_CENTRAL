const exress = require("express")
const accessibility = exress.Router()
const upload = require("../middleware/upload")

const  { Addaccessibility, Allaccessibility, Updateaccessibility, Deleteaccessibility }= require("../controller/accessibility.con")

accessibility.post("/add_accessibility",upload.single("image"),Addaccessibility)
accessibility.get("/getall_accessibility",Allaccessibility)
accessibility.put("/update_accessibility/:id",upload.single("image"),Updateaccessibility)
accessibility.delete("/delete_accessibility/:id",Deleteaccessibility)


module.exports = accessibility