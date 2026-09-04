const hospitality = require("../model/hospitality");

const Addhospitality = async (req, res) => {
  try {
    const { bold_title, description } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title || !description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await hospitality.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "hospitality Added Successfully",
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

const Allhospitality = async (req, res) => {
  try {
    const findData = await hospitality.findAll();

    return res.status(200).json({
      status: true,
      message: "All hospitality Fetched Successfully",
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
const Updatehospitality = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title, description } = req.body;

    const findData = await hospitality.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "hospitality Not Found",
      });
    }

    if (!bold_title && !description && !req.file) {
      return res.status(400).json({
        status: false,
        message: "Provide Title, Description Or Image",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description) {
      updateData.description = description;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await hospitality.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await hospitality.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "hospitality Updated Successfully",
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

const Deletehospitality = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await hospitality.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "hospitality Not Found",
      });
    }

    await hospitality.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "hospitality Deleted Successfully",
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
  Addhospitality,
  Allhospitality,
  Updatehospitality,
  Deletehospitality,
};
