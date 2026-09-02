const exress = require("express")
const smartfeatures = exress.Router()
const upload = require("../middleware/upload")

const { Addsmartfeatures, Allsmartfeatures, Updatesmartfeatures, Deletesmartfeatures }= require("../controller/smartfeatures.con")

smartfeatures.post("/add_smartfeatures",upload.single("image"),Addsmartfeatures)
smartfeatures.get("/getall_smartfeatures",Allsmartfeatures)
smartfeatures.put("/update_smartfeatures/:id",upload.single("image"),Updatesmartfeatures)
smartfeatures.delete("/delete_smartfeatures/:id",Deletesmartfeatures)


module.exports = smartfeatures