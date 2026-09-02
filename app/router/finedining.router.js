const express = require("express");
const finedining_router = express.Router();
const upload = require("../middleware/upload");

const {
  Addfinedining,
  Allfinedining,
  Updatefinedining,
  Deletefinedining,
} = require("../controller/finedining.con");

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
finedining_router.put("/update_finedining/:id",upload.fields([
    { name: "option_image_one", maxCount: 1 },
    { name: "option_image_two", maxCount: 1 },
    { name: "option_image_three", maxCount: 1 },
    { name: "option_image_four", maxCount: 1 },
  ]), Updatefinedining);
finedining_router.delete("/delete_finedining/:id",Deletefinedining);

module.exports = finedining_router;
