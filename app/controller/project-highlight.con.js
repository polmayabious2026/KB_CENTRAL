const projecthighlight = require("../model/project-highlight");

const Addprojecthighlight = async (req, res) => {
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
        message: "Provide Bold_title",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await projecthighlight.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "projecthighlight Added Successfully",
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

const Allprojecthighlight = async (req, res) => {
  try {
    const findData = await projecthighlight.findAll();

    return res.status(200).json({
      status: true,
      message: "All projecthighlight Fetched Successfully",
      data: findData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};
const Updateprojecthighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await projecthighlight.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "projecthighlight Not Found",
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

    await projecthighlight.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await projecthighlight.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "projecthighlight Updated Successfully",
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

const Deleteprojecthighlight = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await projecthighlight.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "projecthighlight Not Found",
      });
    }

    await projecthighlight.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "projecthighlight Deleted Successfully",
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
  Addprojecthighlight,
  Allprojecthighlight,
  Updateprojecthighlight,
  Deleteprojecthighlight,
};

