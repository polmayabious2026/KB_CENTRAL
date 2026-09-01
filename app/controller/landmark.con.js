const landamarks = require("../model/landmark");
const sequelize = require("../config/dB")
const fs = require("fs").promises;

const AddLandmark = async (req, res) => {
  const t = await sequelize.transaction();
  try {
  // console.log("========== REQUEST ==========");
  // console.log("BODY:", req.body);
  // console.log("FILE:", req.file);
  // console.log("=============================");

    const { landmark_1, 
            distance_1,
            landmark_2, 
            distance_2,
            landmark_3, 
            distance_3,
            landmark_4, 
            distance_4,
            landmark_5, 
            distance_5    
          } = req.body;
    if (!req.body) {
      return res.status(400).json({
        status: false,
        message: "Please Provide Landmark or Distance",
      });
    }

    const map_image = req.file.filename;

    if (!map_image) {
      return res.status(400).json({
        status: false,
        message: "Please upload Map Image",
      });
    }

    const newLandmarkData = await landamarks.create(
      {
        map_image:map_image,
        landmark_1,
        distance_1,
        landmark_2,
        distance_2,
        landmark_3,
        distance_3,
        landmark_4,
        distance_4,
        landmark_5,
        distance_5,
      },
      { transaction: t },
    );
    await t.commit();

 return res.status(201).json({
      status: true,
      message: "Landmark Added Successfully",
      data: newLandmarkData,
    });
  } catch (error) {
    await t.rollback();
     if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
        console.log("Uploaded file deleted:", req.file.path);
      } catch (fileError) {
        console.error(
          "Failed to delete uploaded file:",
          fileError.message
        );
      }
    }
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
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
  const t = await sequelize.transaction();

  try {
    const { landmark_id } = req.params;

    const {
      landmark_1,
      distance_1,
      landmark_2,
      distance_2,
      landmark_3,
      distance_3,
      landmark_4,
      distance_4,
      landmark_5,
      distance_5,
    } = req.body;

    const landmarkData = await landamarks.findByPk(landmark_id);

    if (!landmarkData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Landmark Not Found",
      });
    }

    const oldMapImage = landmarkData.map_image;

    if (req.file) {
      landmarkData.map_image = req.file.filename;
    }

    if (landmark_1) {
      landmarkData.landmark_1 = landmark_1;
    }

    if (distance_1) {
      landmarkData.distance_1 = distance_1;
    }

    if (landmark_2) {
      landmarkData.landmark_2 = landmark_2;
    }

    if (distance_2) {
      landmarkData.distance_2 = distance_2;
    }

    if (landmark_3) {
      landmarkData.landmark_3 = landmark_3;
    }

    if (distance_3) {
      landmarkData.distance_3 = distance_3;
    }

    if (landmark_4) {
      landmarkData.landmark_4 = landmark_4;
    }

    if (distance_4) {
      landmarkData.distance_4 = distance_4;
    }

    if (landmark_5) {
      landmarkData.landmark_5 = landmark_5;
    }

    if (distance_5) {
      landmarkData.distance_5 = distance_5;
    }

    await landmarkData.save({ transaction: t });

    await t.commit();

   
      if (req.file && oldMapImage) {
        try {
          await fs.unlink(`uploads/${oldMapImage}`);
          console.log("Old map image deleted:", oldMapImage);
        } catch (fileError) {
          console.log(
            "Failed to delete old map image:",
            fileError.message
          );
        }
      }

      return res.status(200).json({
        status: true,
        message: "Landmark Updated Successfully",
        data: landmarkData,
      });

    } catch (error) {
      await t.rollback();

    
      if (req.file?.path) {
        try {
          await fs.unlink(req.file.path);
          console.log("Uploaded file deleted:", req.file.path);
        } catch (fileError) {
          console.error(
            "Failed to delete uploaded file:",
            fileError.message
          );
        }
      }

    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
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

    await landmarkData.destroy({
      transaction: t,
    });

    await t.commit();

    
    if (mapImage) {
      try {
        await fs.unlink(`uploads/${mapImage}`);
        console.log("Map image deleted:", mapImage);
      } catch (fileError) {
        console.log(
          "Failed to delete map image:",
          fileError.message
        );
      }
    }

    return res.status(200).json({
      status: true,
      message: "Landmark Deleted Successfully",
    });

  } catch (error) {
    await t.rollback();

    return res.status(400).json({
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

