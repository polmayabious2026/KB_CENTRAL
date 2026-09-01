const express = require("express");
const strategic_router = express.Router();

const {
AddStrategicAdvantages,
GetAllData,
UpdateStrategicAdvantages

} = require("../controller/strategic-advantages.con");

// add /api/admin before routes
strategic_router.post("/add_strategicadvantages",AddStrategicAdvantages);
strategic_router.get("/getall_strategicadvantages", GetAllData);
strategic_router.patch("/update_strategicadvantages/:strategy_id",UpdateStrategicAdvantages);
// strategic_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = strategic_router;
