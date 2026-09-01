const express = require("express");
const finedining_router = express.Router();
const upload = require("../middleware/upload");

const { Addfinedining, Allfinedining } = require("../controller/finedining.con");

// add /api/admin before routes
finedining_router.post(
  "/add_finedining",
  upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
    { name: "option_image_four", maxCount: 1 },
  
  ]),
  Addfinedining,
);
finedining_router.get("/getall_finedining",Allfinedining);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = finedining_router;
