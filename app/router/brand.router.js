const express = require("express");
const brands = express.Router();

const upload = require("../middleware/upload");

const {
  AddBrands,
  FindAllBrandsData,
  UpdateBrands,
  DeleteBrands,
} = require("../controller/brands.con");

brands.post(
  "/add_brand",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "option_logo", maxCount: 20 },
  ]),
  AddBrands
);

brands.get(
  "/getall_brands",
  FindAllBrandsData
);

brands.put(
  "/update_brand/:brand_id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "option_logo", maxCount: 20 },
  ]),
  UpdateBrands
);

brands.delete(
  "/delete_brand/:brand_id",
  DeleteBrands
);

module.exports = brands;
