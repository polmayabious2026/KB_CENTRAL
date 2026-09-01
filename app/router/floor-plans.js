const express = require("express");
const floor_router = express.Router();
const upload = require("../middleware/upload");

const {
  AddFloorPlans,
  FindAllFloorData,
  UpdateFloorPlans,
  DeleteFloorPlans
} = require("../controller/floor-plans.con");

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

floor_router.put(
  "/update_floorplans/:floor_id",
  upload.fields([
    { name: "floorimage_one", maxCount: 1 },
    { name: "floorimage_two", maxCount: 1 },
    { name: "floorimage_three", maxCount: 1 },
    { name: "floorimage_four", maxCount: 1 },
    { name: "floorimage_five", maxCount: 1 },
  ]),
  UpdateFloorPlans
);

floor_router.delete(
  "/delete_floorplans/:floor_id",
  DeleteFloorPlans
);

module.exports = floor_router;
