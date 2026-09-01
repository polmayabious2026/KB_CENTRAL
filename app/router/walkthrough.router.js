const express = require("express");
const walkthrough_router = express.Router();
const upload = require("../middleware/upload");

const { Addvideo, FindAllVideo } = require("../controller/walkthough.con");

// add /api/admin before routes

walkthrough_router.post("/add_walkthrough", upload.single("video"), Addvideo);
walkthrough_router.get("/all_walkthough", FindAllVideo);

module.exports = walkthrough_router;
