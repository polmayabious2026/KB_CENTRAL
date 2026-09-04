const accessibility = require("../model/accessibility");
const accessibilityPointsModel = require("../model/accessibilitypoints");
const sequelize = require("../config/dB");
const fs = require("fs");

const Addaccessibility = async (req, res) => {
  try {
    const { bulletpoint, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please upload accessibility image",
      });
    }

    if (!bulletpoint || !description) {
      return res.status(400).json({
        status: false,
        message: "Please provide bulletpoint and description",
      });
    }

    const bulletpoints = Array.isArray(bulletpoint)
      ? bulletpoint
      : [bulletpoint];

    const descriptions = Array.isArray(description)
      ? description
      : [description];

    if (bulletpoints.length !== descriptions.length) {
      return res.status(400).json({
        status: false,
        message: "Each bulletpoint must have a description",
      });
    }

    const newAccessibility = await accessibility.create({
      image: req.file.filename,
    });

    const accessibilityData = bulletpoints.map((item, index) => ({
      accessibility_id: newAccessibility.id,
      bulletpoint: item.trim().toUpperCase(),
      description: descriptions[index],
    }));

    await accessibilityPointsModel.bulkCreate(accessibilityData);

    return res.status(201).json({
      status: true,
      message: "Accessibility added successfully",
      data: {
        id: newAccessibility.id,
        image: newAccessibility.image,
        accessibility: accessibilityData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const Allaccessibility = async (req, res) => {
  try {
    const allData = await accessibility.findAll({
      include: [
        {
          model: accessibilityPointsModel,
          as: "accessibilityPoints",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All accessibility details fetched successfully",
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const Updateaccessibility = async (req, res) => {
  try {
    const { accessibility_id } = req.params;
    const { bulletpoint, description } = req.body;

    const accessibilityData = await accessibility.findByPk(accessibility_id);

    if (!accessibilityData) {
      return res.status(404).json({
        status: false,
        message: "Accessibility Not Found",
      });
    }

    if (!bulletpoint || !description) {
      return res.status(400).json({
        status: false,
        message: "Please provide bulletpoint and description",
      });
    }

    const bulletpoints = Array.isArray(bulletpoint)
      ? bulletpoint
      : [bulletpoint];

    const descriptions = Array.isArray(description)
      ? description
      : [description];

    if (bulletpoints.length !== descriptions.length) {
      return res.status(400).json({
        status: false,
        message: "Each bulletpoint must have a description",
      });
    }

    // Update image if new image is uploaded
    if (req.file) {
      const oldImage = accessibilityData.image;

      accessibilityData.image = req.file.filename;

      await accessibilityData.save();

      // Delete old image
      if (oldImage) {
        try {
          await fs.promises.unlink(`uploads/${oldImage}`);
          console.log("Old accessibility image deleted:", oldImage);
        } catch (fileError) {
          console.log(
            "Failed to delete old accessibility image:",
            fileError.message
          );
        }
      }
    }

    // Delete old accessibility points
    await accessibilityPointsModel.destroy({
      where: {
        accessibility_id: accessibility_id,
      },
    });

    // Create new accessibility points
    const accessibilityDataArray = bulletpoints.map((item, index) => ({
      accessibility_id: accessibility_id,
      bulletpoint: item.trim().toUpperCase(),
      description: descriptions[index],
    }));

    await accessibilityPointsModel.bulkCreate(accessibilityDataArray);

    return res.status(200).json({
      status: true,
      message: "Accessibility updated successfully",
      data: {
        id: accessibilityData.id,
        image: accessibilityData.image,
        accessibility: accessibilityDataArray,
      },
    });
  } catch (error) {
    console.log("Update Accessibility Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const Deleteaccessibility = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { accessibility_id } = req.params;

    const accessibilityData = await accessibility.findByPk(
      accessibility_id
    );

    if (!accessibilityData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Accessibility Not Found",
      });
    }

    const image = accessibilityData.image;

    // Delete accessibility points
    await accessibilityPointsModel.destroy({
      where: {
        accessibility_id: accessibility_id,
      },
      transaction: t,
    });

    // Delete main accessibility record
    await accessibilityData.destroy({
      transaction: t,
    });

    await t.commit();

    // Delete image from uploads folder
    if (image) {
      try {
        await fs.promises.unlink(`uploads/${image}`);

        console.log("Accessibility image deleted:", image);
      } catch (fileError) {
        console.log(
          "Failed to delete accessibility image:",
          fileError.message
        );
      }
    }

    return res.status(200).json({
      status: true,
      message: "Accessibility Deleted Successfully",
    });
  } catch (error) {
    await t.rollback();

    console.log("Delete Accessibility Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


module.exports = {
  Addaccessibility,
  Allaccessibility,
  Updateaccessibility,
  Deleteaccessibility,
};
