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
const Updateaccessorylabels = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      bold_title,
      description_start,
      option_one,
      option_two,
      option_three,
      option_four,
      description_end,
    } = req.body;

    const findData = await accessorylabels.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "accessorylabels Not Found",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description_start) {
      updateData.description_start = description_start;
    }

    if (option_one) {
      updateData.option_one = option_one;
    }

    if (option_two) {
      updateData.option_two = option_two;
    }

    if (option_three) {
      updateData.option_three = option_three;
    }

    if (option_four) {
      updateData.option_four = option_four;
    }

    if (description_end) {
      updateData.description_end = description_end;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await accessorylabels.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await accessorylabels.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "accessorylabels Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Deleteaccessorylabels = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await accessorylabels.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "accessorylabels Not Found",
      });
    }

    await accessorylabels.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "accessorylabels Deleted Successfully",
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
  Addaccessorylabels,
  AllaccessorylabelsData,
  Updateaccessorylabels,
  Deleteaccessorylabels,
};


