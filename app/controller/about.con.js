const about = require("../model/about");
const { Op } = require("sequelize");

const AddAboutDetails = async (req, res) => {
  try {
    const { description_1, description_2, description_3 } = req.body;

    if (!description_1 || !description_2 || !description_3) {
      return res.status(400).json({
        status: false,
        message: "All descriptions are required",
      });
    }
    const existingDescription = await about.findOne({
      where: {
        [Op.or]: [
          { description_1: description_1 },
          { description_2: description_1 },
          { description_3: description_1 },

          { description_1: description_2 },
          { description_2: description_2 },
          { description_3: description_2 },

          { description_1: description_3 },
          { description_2: description_3 },
          { description_3: description_3 },
        ],
      },
    });

    if (existingDescription) {
      return res.status(409).json({
        status: false,
        message: "One or more descriptions already exist in the database",
      });
    }

    const newAboutdetails = await about.create({
      description_1,
      description_2,
      description_3,
    });

    return res.status(201).json({
      status: true,
      message: "About Page Details Added Successfully",
      data: newAboutdetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const FindAllAbout = async (req, res) => {
  try {
    const allAboutDetails = await about.findAll();
    return res.status(200).json({
      status: true,
      message: "All About Details Fetched Successfully",
      data: allAboutDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateAboutDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { description_1, description_2, description_3 } = req.body;

    const aboutDetails = await about.findByPk(id);

    if (!aboutDetails) {
      return res.status(404).json({
        status: false,
        message: "About Details Not Found",
      });
    }

    if (!description_1 && !description_2 && !description_3) {
      return res.status(400).json({
        status: false,
        message: "At least one description is required",
      });
    }

    // Check duplicate descriptions in other records
    const duplicateDescription = await about.findOne({
      where: {
        id: {
          [Op.ne]: id, // Exclude current record
        },
        [Op.or]: [
          // description_1
          ...(description_1
            ? [
                { description_1: description_1 },
                { description_2: description_1 },
                { description_3: description_1 },
              ]
            : []),

          // description_2
          ...(description_2
            ? [
                { description_1: description_2 },
                { description_2: description_2 },
                { description_3: description_2 },
              ]
            : []),

          // description_3
          ...(description_3
            ? [
                { description_1: description_3 },
                { description_2: description_3 },
                { description_3: description_3 },
              ]
            : []),
        ],
      },
    });

    if (duplicateDescription) {
      return res.status(409).json({
        status: false,
        message: "One or more descriptions already exist in the database",
      });
    }

    // Update only the fields that were provided
    if (description_1) {
      aboutDetails.description_1 = description_1;
    }

    if (description_2) {
      aboutDetails.description_2 = description_2;
    }

    if (description_3) {
      aboutDetails.description_3 = description_3;
    }

    await aboutDetails.save();

    return res.status(200).json({
      status: true,
      message: "About Page Details Updated Successfully",
      data: aboutDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const DeleteAboutDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const aboutDetails = await about.findByPk(id);

    if (!aboutDetails) {
      return res.status(404).json({
        status: false,
        message: "About Details Not Found",
      });
    }

    await aboutDetails.destroy();

    return res.status(200).json({
      status: true,
      message: "About Page Details Deleted Successfully",
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
  AddAboutDetails,
  FindAllAbout,
  UpdateAboutDetails,
  DeleteAboutDetails,
};

