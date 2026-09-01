const express = require("express");
const leisure_router = express.Router();
const upload = require("../middleware/upload");

const {
  Addleisure,
  FindAllLeisureData,
  UpdateLeisure,
  DeleteLeisure
} = require("../controller/leisure-experiences.con");

// add /api/admin before routes
leisure_router.post(
  "/add_leisure",
  upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
    { name: "option_image_four", maxCount: 1 },
  
  ]),
  Addleisure,
);
leisure_router.get("/getall_leisure",FindAllLeisureData);
leisure_router.put(
  "/update_leisure/:leisure_id",
  upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
    { name: "option_image_four", maxCount: 1 },
  ]),
  UpdateLeisure
);

leisure_router.delete(
  "/delete_leisure/:leisure_id",
  DeleteLeisure
);

module.exports = leisure_router;
