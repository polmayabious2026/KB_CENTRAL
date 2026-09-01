const express = require("express");
const floor_router = express.Router();
const upload = require("../middleware/upload");

const {AddFloorPlans,FindAllFloorData} = require("../controller/floor-plans.con");

// add /api/admin before routes
floor_router.post(
  "/add_floorplans",
  upload.fields([
    { name: "floorimage_one", maxCount: 1 },
    { name: "floorimage_two", maxCount: 1 },
    { name: "floorimage_three", maxCount: 1 },
    { name: "floorimage_four", maxCount: 1 },
    { name: "floorimage_five", maxCount: 1 },
  ]),
 AddFloorPlans,
);
floor_router.get("/getall_floorplans", FindAllFloorData);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = floor_router;
