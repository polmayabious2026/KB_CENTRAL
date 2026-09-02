const retailbrands = require("../model/retail&brands");

const Addretailbrands = async (req, res) => {
  try {
    const { bold_title } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title ) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await retailbrands.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "retailbrands Added Successfully",
      data: createData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};

const Allretailbrands = async (req, res) => {
  try {
    const findData = await retailbrands.findAll();

    return res.status(200).json({
      status: true,
      message: "All retailbrands Fetched Successfully",
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
const Updateretailbrands = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await retailbrands.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "retailbrands Not Found",
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
      updateData.bold_title = bold_title.trim(" ").toUpperCase();
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await retailbrands.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await retailbrands.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "retailbrands Updated Successfully",
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

const Deleteretailbrands = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await retailbrands.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "retailbrands Not Found",
      });
    }

    await retailbrands.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "retailbrands Deleted Successfully",
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
  Addretailbrands,
  Allretailbrands,
  Updateretailbrands,
  Deleteretailbrands,
};
