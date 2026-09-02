const wellness = require("../model/wellness");

const Addwellness = async (req, res) => {
  try {
    const { bold_title, description } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title || description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await wellness.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "wellness Added Successfully",
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

const Allwellness = async (req, res) => {
  try {
    const findData = await wellness.findAll();

    return res.status(200).json({
      status: true,
      message: "All wellness Fetched Successfully",
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

const Updatewellness = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title, description } = req.body;

    const findData = await wellness.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "wellness Not Found",
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

    await wellness.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await wellness.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "wellness Updated Successfully",
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

const Deletewellness = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await wellness.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "wellness Not Found",
      });
    }

    await wellness.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "wellness Deleted Successfully",
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
  Addwellness,
  Allwellness,
  Updatewellness,
  Deletewellness,
};
