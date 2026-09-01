const exress = require("express")
const retailbrands = exress.Router()
const upload = require("../middleware/upload")

const {Addretailbrands,Allretailbrands}= require("../controller/retailbrands.con")

retailbrands.post("/add_retailbrands",upload.single("image"),Addretailbrands)
retailbrands.get("/getall_retailbrands",Allretailbrands)


module.exports = retailbrands