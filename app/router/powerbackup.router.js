const exress = require("express")
const powerbackup = exress.Router()
const upload = require("../middleware/upload")

const {Addpowerbackup,Allpowerbackup}= require("../controller/powerbackup.con")

powerbackup.post("/add_powerbackup",upload.single("image"),Addpowerbackup)
powerbackup.get("/getall_powerbackup",Allpowerbackup)


module.exports = powerbackup