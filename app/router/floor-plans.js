const express = require("express");
const floor_router = express.Router();

const upload = require("../middleware/upload");

const {
  AddFloorPlans,
  FindAllFloorData,
  FindFloorPlanById,
  UpdateFloorPlans,
  DeleteFloorPlans,
} = require("../controller/floor-plans.con");

floor_router.post(
  "/add_floorplans",
  upload.array("floorimage", 20),
  AddFloorPlans,
);

floor_router.get("/getall_floorplans", FindAllFloorData);

floor_router.get("/get_floorplans/:floor_id", FindFloorPlanById);

floor_router.put(
  "/update_floorplans/:floor_id",
  upload.array("floorimage", 20),
  UpdateFloorPlans,
);

floor_router.delete("/delete_floorplans/:floor_id", DeleteFloorPlans);

module.exports = floor_router;
