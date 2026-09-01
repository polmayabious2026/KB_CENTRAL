const express = require("express");
const brands_router = express.Router();
const upload = require("../middleware/upload");

const { AddBrands, FindAllBrandsData } = require("../controller/brands.con");

// add /api/admin before routes
brands_router.post(
  "/add_brands",
  upload.fields([
    { name: "brandlogo_one", maxCount: 1 },
    { name: "brandlogo_two", maxCount: 1 },
    { name: "brandlogo_three", maxCount: 1 },
    { name: "brandlogo_four", maxCount: 1 },
    { name: "brandlogo_five", maxCount: 1 },
  ]),
  AddBrands,
);
brands_router.get("/getall_brands", FindAllBrandsData);
// submenu_router.put("/update_submenu/:submenu_id",UpdateSubMenu);
// submenu_router.delete("/delete_submenu/:submenu_id",DeleteSubMenu);

module.exports = brands_router;
