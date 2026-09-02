const express = require("express");
const accessorylabels_router = express.Router();
const upload = require("../middleware/upload");

const  {
  Addaccessorylabels,
  AllaccessorylabelsData,
  Updateaccessorylabels,
  Deleteaccessorylabels,
} = require("../controller/accessory-label.con");

// add /api/admin before routes
accessorylabels_router.post("/add_accessorylabels",upload.single("image"), Addaccessorylabels,);
accessorylabels_router.get("/getall_accessorylabels",AllaccessorylabelsData);
accessorylabels_router.put("/update_accessorylabels/:id",upload.single("image"), Updateaccessorylabels);
accessorylabels_router.delete("/delete_accessorylabels/:id",Deleteaccessorylabels);


module.exports = accessorylabels_router;
