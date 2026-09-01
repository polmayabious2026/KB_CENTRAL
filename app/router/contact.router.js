const exress = require("express")
const contact = exress.Router()
const upload = require("../middleware/upload")

const {Addcontact,Allcontact}= require("../controller/contact.con")

contact.post("/add_contact",upload.single("image"),Addcontact)
contact.get("/getall_contact",Allcontact)


module.exports = contact