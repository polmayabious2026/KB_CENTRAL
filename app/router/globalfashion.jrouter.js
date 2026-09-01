const express = require("express");
const globalfashion_router = express.Router();
const upload = require("../middleware/upload");

const { Addglobalfashion, Allglobalfashin } = require("../controller/globalfashion.con");

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
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = globalfashion_router;
