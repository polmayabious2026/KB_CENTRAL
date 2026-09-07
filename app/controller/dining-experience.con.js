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

    const dining_photo = req.files?.dining_photo?.[0]?.filename;

    if (!dining_photo) {
      return res.status(400).json({
        status: false,
        message: "Dining photo is required",
      });
    }

    const logos = [
      req.files?.brandlogo_one?.[0]?.filename,
      req.files?.brandlogo_two?.[0]?.filename,
      req.files?.brandlogo_three?.[0]?.filename,
      req.files?.brandlogo_four?.[0]?.filename,
      req.files?.brandlogo_five?.[0]?.filename,
      req.files?.brandlogo_six?.[0]?.filename,
      req.files?.brandlogo_seven?.[0]?.filename,
      req.files?.brandlogo_eight?.[0]?.filename,
      req.files?.brandlogo_nine?.[0]?.filename,
      req.files?.brandlogo_ten?.[0]?.filename,
      req.files?.brandlogo_eleven?.[0]?.filename,
    ].filter(Boolean);

    if (logos.length !== 11) {
      return res.status(400).json({
        status: false,
        message: "Please upload all 11 brand logos",
      });
    }

    const newDining = await diningexperiences.create({
      title: title.trim(),
      dining_photo,
    });

    const logoData = logos.map((logo) => ({
      dining_id: newDining.id,
      brandlogo: logo,
    }));

    await dininglogos.bulkCreate(logoData);

    const completeData = await diningexperiences.findByPk(newDining.id, {
      include: [
        {
          model: dininglogos,
          as: "dininglogos",
        },
      ],
    });

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

const UpdateDiningExperiences = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { dining_id } = req.params;
    const { title } = req.body;

    const diningData = await diningexperiences.findByPk(dining_id);

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }

    const dining_photo = req.files?.dining_photo?.[0]?.filename;

    if (title && title.trim()) {
      diningData.title = title.trim();
    }

    if (dining_photo) {
      diningData.dining_photo = dining_photo;
    }

    await diningData.save();

    const logos = [
      req.files?.brandlogo_one?.[0]?.filename,
      req.files?.brandlogo_two?.[0]?.filename,
      req.files?.brandlogo_three?.[0]?.filename,
      req.files?.brandlogo_four?.[0]?.filename,
      req.files?.brandlogo_five?.[0]?.filename,
      req.files?.brandlogo_six?.[0]?.filename,
      req.files?.brandlogo_seven?.[0]?.filename,
      req.files?.brandlogo_eight?.[0]?.filename,
      req.files?.brandlogo_nine?.[0]?.filename,
      req.files?.brandlogo_ten?.[0]?.filename,
      req.files?.brandlogo_eleven?.[0]?.filename,
    ].filter(Boolean);

    if (logos.length > 0) {
      await dininglogos.destroy({
        where: {
          dining_id: dining_id,
        },
      });

      const logoData = logos.map((logo) => ({
        dining_id: dining_id,
        brandlogo: logo,
      }));

      await dininglogos.bulkCreate(logoData);
    }

    const updatedData = await diningexperiences.findByPk(dining_id, {
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

    const diningData = await diningexperiences.findByPk(dining_id);

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }

    // Delete all logos first
    await dininglogos.destroy({
      where: {
        dining_id: dining_id,
      },
    });

    // Delete dining experience
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
  UpdateDiningExperiences,
  DeleteDiningExperiences,
};
