const express = require("express");
const submenu_router = express.Router();

const {
AddSubMenu,
FindAllSubMenu,
FindSubMenuById,
UpdateSubMenu,
DeleteSubMenu,
} = require("../controller/sub_menu.con");

// add /api/admin before routes
submenu_router.post("/add_submenu/:menu_id", AddSubMenu);
submenu_router.get("/getall_submenu", FindAllSubMenu);
submenu_router.get("/getall_submenubyid/:menu_id", FindSubMenuById);
submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = submenu_router;
