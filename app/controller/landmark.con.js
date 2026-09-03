const landamarks = require("../model/landmark");
const landmarkPointsModel = require("../model/landmark_points");
const sequelize = require("../config/dB");

const AddLandmark = async (req, res) => {
  try {
    const { landmark, distance } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please upload map image",
      });
    }

    const landmarks = Array.isArray(landmark) ? landmark : [landmark];

    const distances = Array.isArray(distance) ? distance : [distance];

    if (!landmark || !distance) {
      return res.status(400).json({
        status: false,
        message: "Please provide landmark and distance",
      });
    }

    if (landmarks.length !== distances.length) {
      return res.status(400).json({
        status: false,
        message: "Each landmark must have a distance",
      });
    }

    const newLandmark = await landamarks.create({
      map_image: req.file.filename,
    });

    const landmarkData = landmarks.map((item, index) => ({
      landmark_id: newLandmark.id,
      landmark: item,
      distance: distances[index],
    }));

    await landmarkPointsModel.bulkCreate(landmarkData);

    return res.status(201).json({
      status: true,
      message: "Landmarks added successfully",
      data: {
        id: newLandmark.id,
        map_image: newLandmark.map_image,
        landmarks: landmarkData,
      },
    });
  } catch (error) {
    // console.log("ERROR:", error);
    // console.log("ERROR MESSAGE:", error.message);
    // console.log("ERROR NAME:", error.name);
    // console.log("ERROR DETAILS:", error.errors);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
      // details: error.errors?.map((e) => ({
      //   field: e.path,
      //   message: e.message,
      //   value: e.value,
      // })),
    });
  }
};

const FindLandmarkData = async (req, res) => {
  try {
    const allData = await landamarks.findAll();
    return res.status(200).json({
      status: true,
      message: "All landamark Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateLandmark = async (req, res) => {
  try {
    const { landmark_id } = req.params;
    const { landmark, distance } = req.body;

    const landmarkData = await landamarks.findByPk(landmark_id);

    if (!landmarkData) {
      return res.status(404).json({
        status: false,
        message: "Landmark Not Found",
      });
    }

    if (!landmark || !distance) {
      return res.status(400).json({
        status: false,
        message: "Please provide landmark and distance",
      });
    }

    const landmarks = Array.isArray(landmark) ? landmark : [landmark];

    const distances = Array.isArray(distance) ? distance : [distance];

    if (landmarks.length !== distances.length) {
      return res.status(400).json({
        status: false,
        message: "Each landmark must have a distance",
      });
    }

    if (req.file) {
      landmarkData.map_image = req.file.filename;

      await landmarkData.save();
    }

    await landmarkPointsModel.destroy({
      where: {
        landmark_id: landmark_id,
      },
    });

    const landmarkDataArray = landmarks.map((item, index) => ({
      landmark_id: landmark_id,
      landmark: item,
      distance: distances[index],
    }));

    await landmarkPointsModel.bulkCreate(landmarkDataArray);

    return res.status(200).json({
      status: true,
      message: "Landmarks updated successfully",
      data: {
        id: landmarkData.id,
        map_image: landmarkData.map_image,
        landmarks: landmarkDataArray,
      },
    });
  } catch (error) {
    console.log("Update Landmark Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const DeleteLandmark = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { landmark_id } = req.params;

    const landmarkData = await landamarks.findByPk(landmark_id);

    if (!landmarkData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Landmark Not Found",
      });
    }

    const mapImage = landmarkData.map_image;

    await landmarkPointsModel.destroy({
      where: {
        landmark_id: landmark_id,
      },
      transaction: t,
    });

    await landmarkData.destroy({
      transaction: t,
    });

    await t.commit();

    if (mapImage) {
      try {
        await fs.unlink(`uploads/${mapImage}`);

        console.log("Map image deleted:", mapImage);
      } catch (fileError) {
        console.log("Failed to delete map image:", fileError.message);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Landmark Deleted Successfully",
    });
  } catch (error) {
    await t.rollback();

    console.log("Delete Landmark Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddLandmark,
  FindLandmarkData,
  UpdateLandmark,
  DeleteLandmark,
};
