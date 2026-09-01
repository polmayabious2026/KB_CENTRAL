const express = require("express");
const commercialecosystem_router = express.Router();
const upload = require("../middleware/upload");

const {
  AddCommercialEcosystem,
  FindAllCommercialData,
  UpdateCommercialEcosystem,
  DeleteCommercialEcosystem,
} = require("../controller/commercial-ecosystem.con");

// add /api/admin before routes
commercialecosystem_router.post("/add_commercialecosystem",upload.single("image"), AddCommercialEcosystem,);
commercialecosystem_router.get("/getall_commercialecosystem", FindAllCommercialData);
commercialecosystem_router.put(
  "/update_commercialecosystem/:commercial_id",
  upload.single("image"),
  UpdateCommercialEcosystem
);

commercialecosystem_router.delete(
  "/delete_commercialecosystem/:commercial_id",
  DeleteCommercialEcosystem
);

module.exports = commercialecosystem_router;
