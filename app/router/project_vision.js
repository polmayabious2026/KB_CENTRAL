const exress = require("express");
const project_vision = exress.Router();
const upload = require("../middleware/upload");

const {
  createProjectVision,
  getAllProjectVisions,
  getProjectVisionById,
  updateProjectVision,
  deleteProjectVision,
} = require("../controller/project_vision");

project_vision.post(
  "/add_project_vision",
  upload.fields([
    { name: "banner_image", maxCount: 1 },
    { name: "second_image", maxCount: 1 },
    { name: "third_image", maxCount: 1 },
    { name: "last_image", maxCount: 1 },
  ]),
  createProjectVision
);

project_vision.get("/getall_project_vision", getAllProjectVisions);
project_vision.get("/get_project_vision/:id", getProjectVisionById);

project_vision.put(
  "/update_project_vision/:id",
  upload.fields([
    { name: "banner_image", maxCount: 1 },
    { name: "second_image", maxCount: 1 },
    { name: "third_image", maxCount: 1 },
    { name: "last_image", maxCount: 1 },
  ]),
  updateProjectVision
);

project_vision.delete("/delete_project_vision/:id", deleteProjectVision);

module.exports = project_vision;
