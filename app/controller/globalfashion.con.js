const globalfashion = require("../model/globalfashion");

const Addglobalfashion = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      bold_title,
      description,
      option_title_one,
      option_title_two,
      option_title_three,
    } = req.body;
    if (!req.body) {
      return res.status(400).json({
        status: false,
        message: "Please Provide All Titles",
      });
    }

    const option_image_one = req.files?.option_image_one?.[0]?.filename;

    const option_image_two = req.files?.option_image_two?.[0]?.filename;

    const option_image_three = req.files?.option_image_three?.[0]?.filename;

    if (!option_image_one || !option_image_two || !option_image_three) {
      return res.status(400).json({
        status: false,
        message: "Please upload all 3 Option Images",
      });
    }

    const newBrand = await globalfashion.create({
      bold_title,
      description,
      option_title_one,
      option_title_two,
      option_title_three,
      option_image_one,
      option_image_two,
      option_image_three,
    });

    return res.status(201).json({
      status: true,
      message: "Leisre Detils added successfully",
      data: newBrand,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const Allglobalfashin = async (req, res) => {
  try {
    const allData = await globalfashion.findAll();
    return res.status(200).json({
      status: true,
      message: "All globalfashin Details Fetched Successfully",
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

module.exports = { Addglobalfashion, Allglobalfashin };
