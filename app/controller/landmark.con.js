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





module.exports = {
  AddLandmark,
  FindLandmarkData,
};
