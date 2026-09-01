const express = require("express");
const commercialecosystem_router = express.Router();
const upload = require("../middleware/upload");

const {AddCommercialEcosystem,
    FindAllCommercialData } = require("../controller/commercial-ecosystem.con");

// add /api/admin before routes
commercialecosystem_router.post("/add_commercialecosystem",upload.single("image"), AddCommercialEcosystem,);
commercialecosystem_router.get("/getall_commercialecosystem", FindAllCommercialData);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = commercialecosystem_router;
