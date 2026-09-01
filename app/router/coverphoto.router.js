const express = require("express");
const coverphoto_router = express.Router();
const upload = require("../middleware/upload");

const {
Addcoverphoto,
  FindAllCover,
  UpdateCoverphoto,
  DeleteCoverphoto,
} = require("../controller/cover_photo.con");

// add /api/admin before routes
coverphoto_router.post("/add_coverphoto",upload.single("image"), Addcoverphoto);
coverphoto_router.get("/getall_coverphoto", FindAllCover);
coverphoto_router.put(
  "/update_coverphoto/:id",
  upload.single("image"),
  UpdateCoverphoto
);

coverphoto_router.delete(
  "/delete_coverphoto/:id",
  DeleteCoverphoto
);

module.exports = coverphoto_router;
