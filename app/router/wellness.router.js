const exress = require("express")
const wellness_router = exress.Router()
const upload = require("../middleware/upload")

const {Addwellness,Allwellness}= require("../controller/welleness.con")

wellness_router.post("/add_wellness",upload.single("image"),Addwellness)
wellness_router.get("/getall_wellness",Allwellness)


module.exports = wellness_router