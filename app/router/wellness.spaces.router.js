const exress = require("express")
const wellnessspaces_router = exress.Router()
const upload = require("../middleware/upload")

const {
  AddWellnessSpaces,
  AllWellnessData,
  UpdateWellnessSpaces,
  DeleteWellnessSpaces,}
= require("../controller/wellness-spaces.con")

wellnessspaces_router.post(
  "/add_wellnessSpaces",
  upload.fields([
    { name: "wellness_background_photo", maxCount: 1 },
    { name: "brandlogo_one", maxCount: 1 },
    { name: "brandlogo_two", maxCount: 1 },
    { name: "brandlogo_three", maxCount: 1 },
    { name: "brandlogo_four", maxCount: 1 },
    { name: "brandlogo_five", maxCount: 1 },
    { name: "brandlogo_six", maxCount: 1 },
    { name: "brandlogo_seven", maxCount: 1 },
    { name: "brandlogo_eight", maxCount: 1 },
  ]),
  AddWellnessSpaces
);

wellnessspaces_router.get("/getall_wellnessSpaces",AllWellnessData)
wellnessspaces_router.put(
  "/update_wellnessSpaces/:id",
  upload.fields([
    { name: "wellness_background_photo", maxCount: 1 },
    { name: "brandlogo_one", maxCount: 1 },
    { name: "brandlogo_two", maxCount: 1 },
    { name: "brandlogo_three", maxCount: 1 },
    { name: "brandlogo_four", maxCount: 1 },
    { name: "brandlogo_five", maxCount: 1 },
    { name: "brandlogo_six", maxCount: 1 },
    { name: "brandlogo_seven", maxCount: 1 },
    { name: "brandlogo_eight", maxCount: 1 },
  ]),
  UpdateWellnessSpaces
);

wellnessspaces_router.delete("/delete_wellnessSpaces/:id",DeleteWellnessSpaces)


module.exports = wellnessspaces_router