const exress = require("express")
const parking = exress.Router()
const upload = require("../middleware/upload")

const {
  Addparking,
  Allparking,
  Updateparking,
  Deleteparking,
}= require("../controller/parking.con")

parking.post("/add_parking",upload.single("image"),Addparking)
parking.get("/getall_parking",Allparking)
parking.put("/update_parking/:id",upload.single("image"),Updateparking)
parking.delete("/delete_parking/:id",Deleteparking)

module.exports = parking