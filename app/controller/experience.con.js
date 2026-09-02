const experience = require("../model/experience");

const Addexperience = async (req, res) => {
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
    const createData = await experience.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "experience Added Successfully",
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

const Allexperience = async (req, res) => {
  try {
    const findData = await experience.findAll();

    return res.status(200).json({
      status: true,
      message: "All experience Fetched Successfully",
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
const Updateexperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await experience.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "experience Not Found",
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

    await experience.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await experience.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "experience Updated Successfully",
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

const Deleteexperience = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await experience.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "experience Not Found",
      });
    }

    await experience.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "experience Deleted Successfully",
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
  Addexperience,
  Allexperience,
  Updateexperience,
  Deleteexperience,
};


