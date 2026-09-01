const exress = require("express")
const connectivity = exress.Router()
const upload = require("../middleware/upload")

const  {
  Addconnectivity,
  Allconnectivity,
  Updateconnectivity,
  Deleteconnectivity
}= require("../controller/connectivity.con")

connectivity.post("/add_connectivity",upload.single("image"),Addconnectivity)
connectivity.get("/getall_connectivity",Allconnectivity)
connectivity.put("/update_connectivity/:connectivity_id",upload.single("image"),Updateconnectivity)
connectivity.delete("/delete_connectivity/:connectivity_id",Deleteconnectivity)


module.exports = connectivity