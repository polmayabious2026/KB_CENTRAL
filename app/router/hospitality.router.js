const exress = require("express")
const hospitality_router = exress.Router()
const upload = require("../middleware/upload")

const {Addhospitality,Allhospitality}= require("../controller/hospitality.con")

hospitality_router.post("/add_hospitality",upload.single("image"),Addhospitality)
hospitality_router.get("/getall_hospitality",Allhospitality)


module.exports = hospitality_router