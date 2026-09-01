const exress = require("express")
const location_advantages_router = exress.Router()
const upload = require("../middleware/upload")

const  {
  Addlocationadvantages,
  Alllocationadvantages,
  Updatelocationadvantages,
  Deletelocationadvantages,
}= require("../controller/location_advantages.con")

location_advantages_router.post("/add_location_advantages",upload.single("image"),Addlocationadvantages)
location_advantages_router.get("/getall_location_advantages",Alllocationadvantages)
location_advantages_router.put("/update_location_advantages/:location_id",upload.single("image"),Updatelocationadvantages)
location_advantages_router.delete("/delete_location_advantages/:location_id",Deletelocationadvantages)


module.exports = location_advantages_router