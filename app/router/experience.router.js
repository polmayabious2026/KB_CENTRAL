const exress = require("express")
const experience = exress.Router()
const upload = require("../middleware/upload")

const {Addexperience,Allexperience}= require("../controller/experience.con")

experience.post("/add_experience",upload.single("image"),Addexperience)
experience.get("/getall_experience",Allexperience)


module.exports = experience