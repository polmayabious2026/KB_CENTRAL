const entertainmentleisure = require("../model/entertainment_leisure");

const Addentertainmentleisure = async (req, res) => {
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
    const createData = await entertainmentleisure.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "entertainmentleisure Added Successfully",
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

const Allentertainmentleisure = async (req, res) => {
  try {
    const findData = await entertainmentleisure.findAll();

    return res.status(200).json({
      status: true,
      message: "All entertainmentleisure Fetched Successfully",
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
const Updateentertainmentleisure = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title, description } = req.body;

    const findData = await entertainmentleisure.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "entertainmentleisure Not Found",
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
      updateData.bold_title = bold_title.trim(" ").toUpperCase();
    }

    if (description) {
      updateData.description = description;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await entertainmentleisure.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await entertainmentleisure.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "entertainmentleisure Updated Successfully",
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

const Deleteentertainmentleisure = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await entertainmentleisure.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "entertainmentleisure Not Found",
      });
    }

    await entertainmentleisure.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "entertainmentleisure Deleted Successfully",
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
  Addentertainmentleisure,
  Allentertainmentleisure,
  Updateentertainmentleisure,
  Deleteentertainmentleisure,
};
