const finedining = require("../model/fine-dining");

const Addfinedining = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);

    const {
      bold_title,
      description,
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

    const option_image_four = req.files?.option_image_four?.[0]?.filename;

    if (!option_image_one || !option_image_two || !option_image_three||!option_image_four ) {
      return res.status(400).json({
        status: false,
        message: "Please upload all 4 Option Images",
      });
    }

    const newBrand = await finedining.create({
      bold_title,
      description,
      option_image_one,
      option_image_two,
      option_image_three,
      option_image_four,
    });

    return res.status(201).json({
      status: true,
      message: "Fine Dining Detils added successfully",
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
const Allfinedining = async (req, res) => {
  try {
    const allData = await finedining.findAll();
    return res.status(200).json({
      status: true,
      message: "All Finedining Details Fetched Successfully",
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
const Updatefinedining = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      bold_title,
      description,
    } = req.body;

    const findData = await finedining.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Finedining Details Not Found",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title;
    }

    if (description) {
      updateData.description = description;
    }

    const option_image_one =
      req.files?.option_image_one?.[0]?.filename;

    const option_image_two =
      req.files?.option_image_two?.[0]?.filename;

    const option_image_three =
      req.files?.option_image_three?.[0]?.filename;

    const option_image_four =
      req.files?.option_image_four?.[0]?.filename;

    if (option_image_one) {
      updateData.option_image_one = option_image_one;
    }

    if (option_image_two) {
      updateData.option_image_two = option_image_two;
    }

    if (option_image_three) {
      updateData.option_image_three = option_image_three;
    }

    if (option_image_four) {
      updateData.option_image_four = option_image_four;
    }

    await finedining.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await finedining.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Finedining Details Updated Successfully",
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

const Deletefinedining = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await finedining.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Finedining Details Not Found",
      });
    }

    await finedining.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Finedining Details Deleted Successfully",
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
  Addfinedining,
  Allfinedining,
  Updatefinedining,
  Deletefinedining,
};

