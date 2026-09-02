const exress = require("express")
const wellnessspaces_router = exress.Router()
const upload = require("../middleware/upload")

const {
  AddWellnessSpaces,
  AllWellnessData,
  UpdateWellnessSpaces,
  DeleteWellnessSpaces,}
= require("../controller/wellness-spaces.con")

wellnessspaces_router.post("/add_wellnessSpaces",upload.single("image"),AddWellnessSpaces)
wellnessspaces_router.get("/getall_wellnessSpaces",AllWellnessData)
wellnessspaces_router.put("/update_wellnessSpaces/:id",upload.single("image"),UpdateWellnessSpaces)
wellnessspaces_router.delete("/delete_wellnessSpaces/:id",DeleteWellnessSpaces)


module.exports = wellnessspaces_router