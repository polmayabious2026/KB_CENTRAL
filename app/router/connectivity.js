const exress = require("express")
const connectivity = exress.Router()
const upload = require("../middleware/upload")

const {Addconnectivity,Allconnectivity}= require("../controller/connectivity.con")

connectivity.post("/add_connectivity",upload.single("image"),Addconnectivity)
connectivity.get("/getall_connectivity",Allconnectivity)


module.exports = connectivity