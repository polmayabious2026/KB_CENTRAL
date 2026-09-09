const express = require("express");
const dining_router = express.Router();

const upload = require("../middleware/upload");

const {
  AddDiningExperiences,
  AllDiningExperienceData,
  GetDiningExperience,
  UpdateDiningExperiences,
  DeleteDiningExperiences,
} = require("../controller/dining-experience.con");


dining_router.post(
  "/add_dinings",
  upload.fields([
    {
      name: "dining_photo",
      maxCount: 1,
    },
    {
      name: "brandlogo",
      maxCount: 50,
    },
  ]),
  AddDiningExperiences
);


dining_router.get(
  "/getall_dinings",
  AllDiningExperienceData
);


dining_router.get(
  "/get_dining/:dining_id",
  GetDiningExperience
);


dining_router.put(
  "/update_diningexperience/:dining_id",
  upload.fields([
    {
      name: "dining_photo",
      maxCount: 1,
    },
    {
      name: "brandlogo",
      maxCount: 50,
    },
  ]),
  UpdateDiningExperiences
);


dining_router.delete(
  "/delete_diningexperience/:dining_id",
  DeleteDiningExperiences
);

module.exports = dining_router;
