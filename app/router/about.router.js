const express = require("express");
const about_router = express.Router();

const upload = require("../middleware/upload");

const {
  AddAboutDetails,
  FindAllAbout,
  UpdateAboutDetails,
  DeleteAboutDetails,
} = require("../controller/about.con");

about_router.post(
  "/add_aboutdetails",
  upload.single("icon"),
  AddAboutDetails
);

about_router.get(
  "/getall_aboutdetails",
  FindAllAbout
);

about_router.put(
  "/update_aboutdetails/:id",
  upload.single("icon"),
  UpdateAboutDetails
);

about_router.delete(
  "/delete_aboutdetails/:id",
  DeleteAboutDetails
);

module.exports = about_router;
