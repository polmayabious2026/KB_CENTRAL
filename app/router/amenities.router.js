const exress = require("express")
const amenities = exress.Router()
const upload = require("../middleware/upload")

const {Addamenities,Allamenities}= require("../controller/amenities.con")

amenities.post("/add_amenities",upload.single("image"),Addamenities)
amenities.get("/getall_amenities",Allamenities)


module.exports = amenities