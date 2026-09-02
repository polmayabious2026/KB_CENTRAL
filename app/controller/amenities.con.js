const amenities = require("../model/amenities");

const Addamenities = async (req, res) => {
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
    const createData = await amenities.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "amenities Added Successfully",
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

const Allamenities = async (req, res) => {
  try {
    const findData = await amenities.findAll();

    return res.status(200).json({
      status: true,
      message: "All amenities Fetched Successfully",
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
const Updateamenities = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await amenities.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "amenities Not Found",
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

    await amenities.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await amenities.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "amenities Updated Successfully",
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

const Deleteamenities = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await amenities.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "amenities Not Found",
      });
    }

    await amenities.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "amenities Deleted Successfully",
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
  Addamenities,
  Allamenities,
  Updateamenities,
  Deleteamenities,
};
