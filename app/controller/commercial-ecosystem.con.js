
const commercialecosystem = require("../model/commercial-ecosystem")

const AddCommercialEcosystem = async (req, res) => {
  try {
    const {
      title,
      option_one,
      option_two,
      option_three,
      option_four,
      option_five,
    } = req.body;
    
     if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
     if (!title) {
            return res.status(400).json({
                status: false,
                message: "Title is required",
            });
        }
    
    const upperChaseTitle = title.trim("").toUpperCase();
    
    const newData = await commercialecosystem.create({
      image:req.file.filename,
      title:upperChaseTitle,
      option_one,
      option_two,
      option_three,
      option_four,
      option_five,

    });
    return res.status(201).json({
      status: true,
      message: "CommercialEcosystem Added Successfully",
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
const FindAllCommercialData = async (req, res) => {
  try {
    const allData = await commercialecosystem.findAll();
    return res.status(200).json({
      status: true,
      message: "All Commercial Ecosystem Successfully",
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
const UpdateCommercialEcosystem = async (req, res) => {
  try {
    const { commercial_id } = req.params;
    const {
      title,
      option_one,
      option_two,
      option_three,
      option_four,
      option_five,
    } = req.body;

    const commercialData = await commercialecosystem.findByPk(commercial_id);

    if (!commercialData) {
      return res.status(404).json({
        status: false,
        message: "Commercial Ecosystem Not Found",
      });
    }

    if (req.file) {
      commercialData.image = req.file.filename;
    }

    if (title) {
      commercialData.title = title.trim().toUpperCase();
    }

    if (option_one) {
      commercialData.option_one = option_one;
    }

    if (option_two) {
      commercialData.option_two = option_two;
    }

    if (option_three) {
      commercialData.option_three = option_three;
    }

    if (option_four) {
      commercialData.option_four = option_four;
    }

    if (option_five) {
      commercialData.option_five = option_five;
    }

    await commercialData.save();

    return res.status(200).json({
      status: true,
      message: "CommercialEcosystem Updated Successfully",
      data: commercialData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};

const DeleteCommercialEcosystem = async (req, res) => {
  try {
    const { commercial_id } = req.params;

    const commercialData = await commercialecosystem.findByPk(commercial_id);

    if (!commercialData) {
      return res.status(404).json({
        status: false,
        message: "Commercial Ecosystem Not Found",
      });
    }

    await commercialData.destroy();

    return res.status(200).json({
      status: true,
      message: "CommercialEcosystem Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};

module.exports = {
  AddCommercialEcosystem,
  FindAllCommercialData,
  UpdateCommercialEcosystem,
  DeleteCommercialEcosystem,
};



