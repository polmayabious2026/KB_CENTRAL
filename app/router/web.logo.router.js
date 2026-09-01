const express = require("express");
const web_logo_router = express.Router();
const upload = require("../middleware/upload");

const { addLogo } = require("../controller/websitelogo.con");

// add /api/admin before routes
web_logo_router.get("/", async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Working Successfully",
  });
});
web_logo_router.post("/add_logo", upload.single("image"), addLogo);

module.exports = web_logo_router;
