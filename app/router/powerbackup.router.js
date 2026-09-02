const exress = require("express")
const powerbackup = exress.Router()
const upload = require("../middleware/upload")

const {Addpowerbackup,Allpowerbackup,Updatepowerbackup,Deletepowerbackup}= require("../controller/powerbackup.con")

powerbackup.post("/add_powerbackup",upload.single("image"),Addpowerbackup)
powerbackup.get("/getall_powerbackup",Allpowerbackup)
powerbackup.put("/update_powerbackup/:id",upload.single("image"),Updatepowerbackup)
powerbackup.delete("/delete_powerbackup/:id",Deletepowerbackup)


module.exports = powerbackup