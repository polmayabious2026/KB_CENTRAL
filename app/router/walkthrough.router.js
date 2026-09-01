const express = require("express");
const walkthrough_router = express.Router();
const upload = require("../middleware/upload");

const {
  Addvideo,
  FindAllVideo,
  UpdateVideo,
  DeleteVideo
} = require("../controller/walkthough.con");

// add /api/admin before routes

walkthrough_router.post("/add_walkthrough", upload.single("video"), Addvideo);
walkthrough_router.get("/all_walkthough", FindAllVideo);
walkthrough_router.put(
  "/update_video/:walkthrough_id",
  upload.fields([
    { name: "video", maxCount: 1 }
  ]),
  UpdateVideo
);

walkthrough_router.delete(
  "/delete_video/:walkthrough_id",
  DeleteVideo
);
module.exports = walkthrough_router;
