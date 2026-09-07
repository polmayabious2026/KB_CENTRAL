const finedining = require("../model/fine-dining");
const finediningoption = require("../model/finediningoption");

const Addfinedining = async (req, res) => {
  try {
    const { bold_title, description } = req.body;

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Description is required",
      });
    }

    const optionImages = req.files?.option_image || [];

    if (optionImages.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option image is required",
      });
    }

    const newFineDining = await finedining.create({
      bold_title: bold_title ? bold_title.trim() : null,
      description: description.trim(),
    });

    const optionsData = optionImages.map((file) => ({
      finedining_id: newFineDining.id,
      option_image: file.filename,
    }));

    await finediningoption.bulkCreate(optionsData);

    return res.status(201).json({
      status: true,
      message: "Fine Dining Details Added Successfully",
      data: {
        id: newFineDining.id,
        bold_title: newFineDining.bold_title,
        description: newFineDining.description,
        options: optionsData,
      },
    });
  } catch (error) {
    console.error("Addfinedining Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Allfinedining = async (req, res) => {
  try {
    const allData = await finedining.findAll({
      include: [
        {
          model: finediningoption,
          as: "finediningoptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Fine Dining Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("Allfinedining Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Updatefinedining = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title, description } = req.body;

    const findData = await finedining.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Fine Dining Details Not Found",
      });
    }

    const updateData = {};

    if (bold_title !== undefined) {
      updateData.bold_title = bold_title.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (Object.keys(updateData).length > 0) {
      await finedining.update(updateData, {
        where: {
          id: id,
        },
      });
    }

    const optionImages = req.files?.option_image || [];

    if (optionImages.length > 0) {
      await finediningoption.destroy({
        where: {
          finedining_id: id,
        },
      });

      const optionsData = optionImages.map((file) => ({
        finedining_id: id,
        option_image: file.filename,
      }));

      await finediningoption.bulkCreate(optionsData);
    }

    const updatedData = await finedining.findByPk(id, {
      include: [
        {
          model: finediningoption,
          as: "finediningoptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Fine Dining Details Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Updatefinedining Error:", error);

    return res.status(500).json({
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
        message: "Fine Dining Details Not Found",
      });
    }

    await finediningoption.destroy({
      where: {
        finedining_id: id,
      },
    });

    await finedining.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Fine Dining Details Deleted Successfully",
    });
  } catch (error) {
    console.error("Deletefinedining Error:", error);

    return res.status(500).json({
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
