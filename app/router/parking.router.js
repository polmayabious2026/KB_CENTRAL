const exress = require("express")
const parking = exress.Router()
const upload = require("../middleware/upload")

const {Addparking,Allparking}= require("../controller/parking.con")

parking.post("/add_parking",upload.single("image"),Addparking)
parking.get("/getall_parking",Allparking)


module.exports = parking