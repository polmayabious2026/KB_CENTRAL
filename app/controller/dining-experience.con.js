const { Op } = require("sequelize");

const diningexperiences = require("../model/dining-experiences");
const dininglogos = require("../model/dininglogooption");


const AddDiningExperiences = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }
    const diningPhoto =
      req.files?.dining_photo?.[0]?.filename;

    if (!diningPhoto) {
      return res.status(400).json({
        status: false,
        message: "Dining photo is required",
      });
    }

    const logoFiles = req.files?.brandlogo || [];

    if (logoFiles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one brand logo",
      });
    }


    const newDining = await diningexperiences.create({
      title: title.trim(),
      dining_photo: diningPhoto,
    });


    const logoData = logoFiles.map((file) => ({
      dining_id: newDining.id,
      brandlogo: file.filename,
    }));

    await dininglogos.bulkCreate(logoData);

   
    const completeData = await diningexperiences.findByPk(
      newDining.id,
      {
        include: [
          {
            model: dininglogos,
            as: "dininglogos",
          },
        ],
      }
    );

    return res.status(201).json({
      status: true,
      message: "Dining Experience Added Successfully",
      data: completeData,
    });
  } catch (error) {
    console.error("AddDiningExperiences Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const AllDiningExperienceData = async (req, res) => {
  try {
    const allData = await diningexperiences.findAll({
      include: [
        {
          model: dininglogos,
          as: "dininglogos",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "All Dining Experience Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("AllDiningExperienceData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const GetDiningExperience = async (req, res) => {
  try {
    const { dining_id } = req.params;

    const diningData = await diningexperiences.findByPk(
      dining_id,
      {
        include: [
          {
            model: dininglogos,
            as: "dininglogos",
          },
        ],
      }
    );

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Dining Experience Details Fetched Successfully",
      data: diningData,
    });
  } catch (error) {
    console.error("GetDiningExperience Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const UpdateDiningExperiences = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { dining_id } = req.params;
    const { title } = req.body;

 
    const diningData = await diningexperiences.findByPk(
      dining_id
    );

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }


    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      diningData.title = title.trim();
    }


    const diningPhoto =
      req.files?.dining_photo?.[0]?.filename;

    if (diningPhoto) {
      diningData.dining_photo = diningPhoto;
    }

    await diningData.save();


    const logoFiles = req.files?.brandlogo || [];


    if (logoFiles.length > 0) {
   
      await dininglogos.destroy({
        where: {
          dining_id: dining_id,
        },
      });

   
      const logoData = logoFiles.map((file) => ({
        dining_id: dining_id,
        brandlogo: file.filename,
      }));

      await dininglogos.bulkCreate(logoData);
    }

    const updatedData =
      await diningexperiences.findByPk(dining_id, {
        include: [
          {
            model: dininglogos,
            as: "dininglogos",
          },
        ],
      });

    return res.status(200).json({
      status: true,
      message: "Dining Experience Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("UpdateDiningExperiences Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const DeleteDiningExperiences = async (req, res) => {
  try {
    const { dining_id } = req.params;


    const diningData = await diningexperiences.findByPk(
      dining_id
    );

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }
    await dininglogos.destroy({
      where: {
        dining_id: dining_id,
      },
    });

    await diningData.destroy();

    return res.status(200).json({
      status: true,
      message: "Dining Experience Deleted Successfully",
    });
  } catch (error) {
    console.error("DeleteDiningExperiences Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddDiningExperiences,
  AllDiningExperienceData,
  GetDiningExperience,
  UpdateDiningExperiences,
  DeleteDiningExperiences,
};
