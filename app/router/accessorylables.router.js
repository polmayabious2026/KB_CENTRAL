const express = require("express");
const accessorylabels_router = express.Router();
const upload = require("../middleware/upload");

const  {Addaccessorylabels,AllaccessorylabelsData } = require("../controller/accessory-label.con");

// add /api/admin before routes
accessorylabels_router.post("/add_accessorylabels",upload.single("image"), Addaccessorylabels,);
accessorylabels_router.get("/getall_accessorylabels",AllaccessorylabelsData);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = accessorylabels_router;
