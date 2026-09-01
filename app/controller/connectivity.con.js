const connectivity = require("../model/connectivity");

const Addconnectivity = async (req, res) => {
  try {
    const { bold_title, description } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title || description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await connectivity.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "connectivity Added Successfully",
      data: createData,
    });
  }catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};

const Allconnectivity = async (req, res) => {
  try {
    const findData = await connectivity.findAll();

    return res.status(200).json({
      status: true,
      message: "All connectivity Fetched Successfully",
      data: findData,
    });
  }catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};

const Updateconnectivity = async (req, res) => {
  try {
    const { connectivity_id } = req.params;
    const { bold_title, description } = req.body;

    const connectivityData = await connectivity.findByPk(connectivity_id);

    if (!connectivityData) {
      return res.status(404).json({
        status: false,
        message: "Connectivity Not Found",
      });
    }

    if (req.file) {
      connectivityData.image = req.file.filename;
    }

    if (bold_title) {
      connectivityData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description) {
      connectivityData.description = description;
    }

    await connectivityData.save();

    return res.status(200).json({
      status: true,
      message: "connectivity Updated Successfully",
      data: connectivityData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};


const Deleteconnectivity = async (req, res) => {
  try {
    const { connectivity_id } = req.params;

    const connectivityData =
      await connectivity.findByPk(connectivity_id);

    if (!connectivityData) {
      return res.status(404).json({
        status: false,
        message: "Connectivity Not Found",
      });
    }

    await connectivityData.destroy();

    return res.status(200).json({
      status: true,
      message: "connectivity Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  Addconnectivity,
  Allconnectivity,
  Updateconnectivity,
  Deleteconnectivity
};