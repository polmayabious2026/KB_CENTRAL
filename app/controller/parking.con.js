const parking = require("../model/parking");

const Addparking = async (req, res) => {
  try {
    const { bold_title,description } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title||!description ) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await parking.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
      description,
    });

    return res.status(201).json({
      status: true,
      message: "parking Added Successfully",
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

const Allparking = async (req, res) => {
  try {
    const findData = await parking.findAll();

    return res.status(200).json({
      status: true,
      message: "All parking Fetched Successfully",
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
const Updateparking = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await parking.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "parking Not Found",
      });
    }

    if (!bold_title && !req.file) {
      return res.status(400).json({
        status: false,
        message: "Provide Title Or Image",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title.trim().toUpperCase();
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await parking.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await parking.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "parking Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

const Deleteparking = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await parking.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "parking Not Found",
      });
    }

    await parking.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "parking Deleted Successfully",
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
  Addparking,
  Allparking,
  Updateparking,
  Deleteparking,
};
