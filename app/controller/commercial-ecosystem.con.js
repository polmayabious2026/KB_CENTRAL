
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













module.exports = {AddCommercialEcosystem,FindAllCommercialData }