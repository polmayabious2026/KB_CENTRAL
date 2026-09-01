const exress = require("express")
const smartfeatures = exress.Router()
const upload = require("../middleware/upload")

const {Addsmartfeatures,Allsmartfeatures}= require("../controller/smartfeatures.con")

smartfeatures.post("/add_smartfeatures",upload.single("image"),Addsmartfeatures)
smartfeatures.get("/getall_smartfeatures",Allsmartfeatures)


module.exports = smartfeatures