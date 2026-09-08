const express = require("express");
const experience = express.Router();
const upload = require("../middleware/upload");

const {
  Addexperience,
  Allexperience,
  Singleexperience,
  Updateexperience,
  Deleteexperience,
} = require("../controller/experience.con");

const experienceUpload = upload.fields([
  { name: "banner_image", maxCount: 1 },
  { name: "first_image", maxCount: 1 },
  { name: "second_image", maxCount: 1 },
  { name: "third_image", maxCount: 1 },
  { name: "last_image", maxCount: 1 },
]);

experience.post("/add_experience", experienceUpload, Addexperience);

experience.get("/getall_experience", Allexperience);

experience.get("/get_experience/:id", Singleexperience);

experience.put("/update_experience/:id", experienceUpload, Updateexperience);

experience.delete("/delete_experience/:id", Deleteexperience);

module.exports = experience;
