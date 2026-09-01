const express = require("express");
const landmark_router = express.Router();
const upload = require("../middleware/upload");

const {
  AddLandmark,
  FindLandmarkData,
  UpdateLandmark,
  DeleteLandmark,
}= require("../controller/landmark.con");

// add /api/admin before routes
landmark_router.post("/add_landmarks", upload.single("image"), AddLandmark);
landmark_router.get("/getall_landmarks", FindLandmarkData);
landmark_router.put(
  "/update_landmark/:landmark_id",
  upload.single("map_image"),
  UpdateLandmark
);

landmark_router.delete(
  "/delete_landmark/:landmark_id",
  DeleteLandmark
);

module.exports = landmark_router;
