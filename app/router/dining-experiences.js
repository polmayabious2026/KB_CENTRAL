const express = require("express");
const dining_router = express.Router();
const upload = require("../middleware/upload");

const {
  AddDiningExperiences,
  AllDiningExperienceData,
  UpdateDiningExperiences,
  DeleteDiningExperiences
} = require("../controller/dining-experience.con");

// add /api/admin before routes
dining_router.post(
  "/add_dinings",
  upload.fields([

    { name: "dining_photo", maxCount: 1 },
    { name: "brandlogo_one", maxCount: 1 },
    { name: "brandlogo_two", maxCount: 1 },
    { name: "brandlogo_three", maxCount: 1 },
    { name: "brandlogo_four", maxCount: 1 },
    { name: "brandlogo_five", maxCount: 1 },
    { name: "brandlogo_six", maxCount: 1 },
    { name: "brandlogo_seven", maxCount: 1 },
    { name: "brandlogo_eight", maxCount: 1 },
    { name: "brandlogo_nine", maxCount: 1 },
    { name: "brandlogo_ten", maxCount: 1 },
    { name: "brandlogo_evelen", maxCount: 1 },
  ]),
  AddDiningExperiences,
);
dining_router.get("/getall_dinings", AllDiningExperienceData);
dining_router.put(
  "/update_diningexperience/:dining_id",
  upload.fields([
    { name: "dining_photo", maxCount: 1 },
    { name: "brandlogo_one", maxCount: 1 },
    { name: "brandlogo_two", maxCount: 1 },
    { name: "brandlogo_three", maxCount: 1 },
    { name: "brandlogo_four", maxCount: 1 },
    { name: "brandlogo_five", maxCount: 1 },
    { name: "brandlogo_six", maxCount: 1 },
    { name: "brandlogo_seven", maxCount: 1 },
    { name: "brandlogo_eight", maxCount: 1 },
    { name: "brandlogo_nine", maxCount: 1 },
    { name: "brandlogo_ten", maxCount: 1 },
    { name: "brandlogo_eleven", maxCount: 1 },
  ]),
  UpdateDiningExperiences
);

dining_router.delete(
  "/delete_diningexperience/:dining_id",
  DeleteDiningExperiences
);

module.exports = dining_router;
