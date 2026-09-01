const accessorylabels = require("../model/accessory-labels");

const Addaccessorylabels = async (req, res) => {
  try {
    const {
      bold_title,
      description_start,
      option_one,
      option_two,
      option_three,
      option_four,
      description_end,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }
    if (!bold_title || !description_start || !description_end) {
      return res.status(400).json({
        status: false,
        message: "Bold_title or Description is required",
      });
    }

    const allOptions = [option_one, option_two, option_three, option_four];

    if (allOptions.some((item) => !item?.trim())) {
      return res.status(400).json({
        status: false,
        message: "Provide all Option points",
      });
    }

    const upperChaseTitle = bold_title.trim().toUpperCase();

    const newData = await accessorylabels.create({
      image: req.file.filename,
      bold_title: upperChaseTitle,
      description_start,
      option_one,
      option_two,
      option_three,
      option_four,
      description_end,
    });
    return res.status(201).json({
      status: true,
      message: "accessorylabels Added Successfully",
      data: newData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};
const AllaccessorylabelsData = async (req, res) => {
  try {
    const allData = await accessorylabels.findAll();
    return res.status(200).json({
      status: true,
      message: "All Accessory labels Successfully",
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

module.exports = { Addaccessorylabels, AllaccessorylabelsData };
