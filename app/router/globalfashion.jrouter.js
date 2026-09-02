const express = require("express");
const globalfashion_router = express.Router();
const upload = require("../middleware/upload");

const {
  Addglobalfashion,
  Allglobalfashin,
  Updateglobalfashion,
  Deleteglobalfashion,
} = require("../controller/globalfashion.con");

// add /api/admin before routes
globalfashion_router.post(
  "/add_globalfashion",
  upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
  
  ]),
  Addglobalfashion,
);
globalfashion_router.get("/getall_globalfashion",Allglobalfashin);
globalfashion_router.put("/update_globalfashion/:id",upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
  ]), Updateglobalfashion);
globalfashion_router.delete("/delete_globalfashion/:id",Deleteglobalfashion);

module.exports = globalfashion_router;
