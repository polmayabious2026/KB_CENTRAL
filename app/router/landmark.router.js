const express = require("express");
const landmark_router = express.Router();
const upload = require("../middleware/upload");

const { AddLandmark, FindLandmarkData } = require("../controller/landmark.con");

// add /api/admin before routes
landmark_router.post("/add_landmarks", upload.single("image"), AddLandmark);
landmark_router.get("/getall_landmarks", FindLandmarkData);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = landmark_router;
