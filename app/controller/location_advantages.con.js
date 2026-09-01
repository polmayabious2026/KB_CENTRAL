const locationadvantages = require("../model/location_advantages");

const Addlocationadvantages = async (req, res) => {
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
    const createData = await locationadvantages.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "locationadvantages Added Successfully",
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

const Alllocationadvantages = async (req, res) => {
  try {
    const findData = await locationadvantages.findAll();

    return res.status(200).json({
      status: true,
      message: "All locationadvantages Fetched Successfully",
      data: findData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};

const Updatelocationadvantages = async (req, res) => {
  try {
    const { location_id } = req.params;
    const { bold_title, description } = req.body;

    const locationData = await locationadvantages.findByPk(location_id);

    if (!locationData) {
      return res.status(404).json({
        status: false,
        message: "Location Advantages Not Found",
      });
    }

    if (req.file) {
      locationData.image = req.file.filename;
    }

    if (bold_title) {
      locationData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description) {
      locationData.description = description;
    }

    await locationData.save();

    return res.status(200).json({
      status: true,
      message: "locationadvantages Updated Successfully",
      data: locationData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};


const Deletelocationadvantages = async (req, res) => {
  try {
    const { location_id } = req.params;

    const locationData = await locationadvantages.findByPk(location_id);

    if (!locationData) {
      return res.status(404).json({
        status: false,
        message: "Location Advantages Not Found",
      });
    }

    await locationData.destroy();

    return res.status(200).json({
      status: true,
      message: "locationadvantages Deleted Successfully",
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
  Addlocationadvantages,
  Alllocationadvantages,
  Updatelocationadvantages,
  Deletelocationadvantages,
};