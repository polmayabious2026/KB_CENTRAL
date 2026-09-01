const exress = require("express")
const location_advantages_router = exress.Router()
const upload = require("../middleware/upload")

const {Addlocationadvantages,Alllocationadvantages}= require("../controller/location_advantages.con")

location_advantages_router.post("/add_location_advantages",upload.single("image"),Addlocationadvantages)
location_advantages_router.get("/getall_location_advantages",Alllocationadvantages)


module.exports = location_advantages_router