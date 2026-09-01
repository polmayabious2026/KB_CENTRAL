const about = require("../model/about");

const AddAboutDetails = async (req, res) => {
  try {
    // console.log("FILE:", req.file);
    const { description } = req.body;
    // console.log("BODY:", req.body);
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Descriptions Icon is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Description is required",
      });
    }

    const newAboutdetails = await about.create({
      icon: req.file.filename,
      description: description,
    });
    return res.status(201).json({
      status: true,
      message: "About Page Details Added Successfully",
      data: newAboutdetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
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
    const { description } = req.body;

    const aboutDetails = await about.findByPk(id);

    if (!aboutDetails) {
      return res.status(404).json({
        status: false,
        message: "About Details Not Found",
      });
    }

    if (!req.file && !description) {
      return res.status(400).json({
        status: false,
        message: "Description or Descriptions Icon is required",
      });
    }

    if (req.file) {
      aboutDetails.icon = req.file.filename;
    }

    if (description) {
      aboutDetails.description = description;
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

