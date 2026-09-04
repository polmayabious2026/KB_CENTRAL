const powerbackup = require("../model/power-backup");

const Addpowerbackup = async (req, res) => {
  try {
    const { bold_title ,description} = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title ||!description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await powerbackup.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
      description,
    });

    return res.status(201).json({
      status: true,
      message: "powerbackup Added Successfully",
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

const Allpowerbackup = async (req, res) => {
  try {
    const findData = await powerbackup.findAll();

    return res.status(200).json({
      status: true,
      message: "All powerbackup Fetched Successfully",
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
const Updatepowerbackup = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title } = req.body;

    const findData = await powerbackup.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "powerbackup Not Found",
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

    await powerbackup.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await powerbackup.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "powerbackup Updated Successfully",
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

const Deletepowerbackup = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await powerbackup.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "powerbackup Not Found",
      });
    }

    await powerbackup.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "powerbackup Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

module.exports = {Addpowerbackup,Allpowerbackup,Updatepowerbackup,Deletepowerbackup}