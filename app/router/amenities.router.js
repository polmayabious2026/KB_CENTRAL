const express = require("express");
const amenities = express.Router();
const upload = require("../middleware/upload");

const {
  Addamenities,
  Allamenities,
  Singleamenities,
  Updateamenities,
  Deleteamenities,
} = require("../controller/amenities.con");

amenities.post("/add_amenities", upload.fields([
  { name: "banner_image", maxCount: 1 },
  { name: "first_image", maxCount: 1 },
  { name: "second_image", maxCount: 1 },
]), Addamenities);

amenities.get("/getall_amenities", Allamenities);

amenities.get("/get_amenities/:id", Singleamenities);

amenities.put("/update_amenities/:id", upload.fields([
  { name: "banner_image", maxCount: 1 },
  { name: "first_image", maxCount: 1 },
  { name: "second_image", maxCount: 1 },
]), Updateamenities);

amenities.delete("/delete_amenities/:id", Deleteamenities);

module.exports = amenities;
