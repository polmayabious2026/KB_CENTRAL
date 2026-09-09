const express = require("express");
const wellnessspaces_router = express.Router();

const upload = require("../middleware/upload");

const {
  AddWellnessSpaces,
  AllWellnessData,
  GetWellnessSpace,
  UpdateWellnessSpaces,
  DeleteWellnessSpaces,
} = require("../controller/wellness-spaces.con");

wellnessspaces_router.post(
  "/add_wellnessSpaces",
  upload.fields([
    {
      name: "wellness_background_photo",
      maxCount: 1,
    },
    {
      name: "brandlogo",
      maxCount: 50,
    },
  ]),
  AddWellnessSpaces,
);

wellnessspaces_router.get("/getall_wellnessSpaces", AllWellnessData);

wellnessspaces_router.get("/get_wellnessSpaces/:id", GetWellnessSpace);

wellnessspaces_router.put(
  "/update_wellnessSpaces/:id",
  upload.fields([
    {
      name: "wellness_background_photo",
      maxCount: 1,
    },
    {
      name: "brandlogo",
      maxCount: 50,
    },
  ]),
  UpdateWellnessSpaces,
);

wellnessspaces_router.delete(
  "/delete_wellnessSpaces/:id",
  DeleteWellnessSpaces,
);

module.exports = wellnessspaces_router;
