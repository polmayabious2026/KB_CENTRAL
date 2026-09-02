const aboutavoragroup = require("../model/aboutavora-group");

const Addaboutavoragroup = async (req, res) => {
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
    const createData = await aboutavoragroup.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "aboutavoragroup Added Successfully",
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

const Allaboutavoragroup = async (req, res) => {
  try {
    const findData = await aboutavoragroup.findAll();

    return res.status(200).json({
      status: true,
      message: "All aboutavoragroup Fetched Successfully",
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
const Updateaboutavoragroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await aboutavoragroup.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "aboutavoragroup Not Found",
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

    await aboutavoragroup.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await aboutavoragroup.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "aboutavoragroup Updated Successfully",
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

const Deleteaboutavoragroup = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await aboutavoragroup.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "aboutavoragroup Not Found",
      });
    }

    await aboutavoragroup.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "aboutavoragroup Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

module.exports = {Addaboutavoragroup,Allaboutavoragroup,Updateaboutavoragroup,Deleteaboutavoragroup}