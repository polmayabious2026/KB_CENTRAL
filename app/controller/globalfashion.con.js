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
const Updateglobalfashion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      bold_title,
      description,
      option_title_one,
      option_title_two,
      option_title_three,
    } = req.body;

    const findData = await globalfashion.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "globalfashion Details Not Found",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title;
    }

    if (description) {
      updateData.description = description;
    }

    if (option_title_one) {
      updateData.option_title_one = option_title_one;
    }

    if (option_title_two) {
      updateData.option_title_two = option_title_two;
    }

    if (option_title_three) {
      updateData.option_title_three = option_title_three;
    }

    const option_image_one =
      req.files?.option_image_one?.[0]?.filename;

    const option_image_two =
      req.files?.option_image_two?.[0]?.filename;

    const option_image_three =
      req.files?.option_image_three?.[0]?.filename;

    if (option_image_one) {
      updateData.option_image_one = option_image_one;
    }

    if (option_image_two) {
      updateData.option_image_two = option_image_two;
    }

    if (option_image_three) {
      updateData.option_image_three = option_image_three;
    }

    await globalfashion.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await globalfashion.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "globalfashion Details Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Deleteglobalfashion = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await globalfashion.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "globalfashion Details Not Found",
      });
    }

    await globalfashion.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "globalfashion Details Deleted Successfully",
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
  Addglobalfashion,
  Allglobalfashin,
  Updateglobalfashion,
  Deleteglobalfashion,
};

