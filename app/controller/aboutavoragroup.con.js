const aboutavoragroup = require("../model/aboutavora-group");

const Addaboutavoragroup = async (req, res) => {
  try {
    console.log("Data:",req.body)
    const { first_title, first_description, second_title, second_description } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Banner image is required",
      });
    }

    if (
      !first_title ||
      !first_description ||
      !second_title ||
      !second_description
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Provide First Title, First Description, Second Title And Second Description",
      });
    }

    const createData = await aboutavoragroup.create({
      banner_image: req.file.filename,
      first_title: first_title.trim(),
      first_description: first_description.trim(),
      second_title: second_title.trim(),
      second_description: second_description.trim(),
    });

    return res.status(201).json({
      status: true,
      message: "About Avora Group Added Successfully",
      data: createData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Allaboutavoragroup = async (req, res) => {
  try {
    const findData = await aboutavoragroup.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "All About Avora Group Fetched Successfully",
      data: findData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Updateaboutavoragroup = async (req, res) => {
  try {
    const { id } = req.params;

    const { first_title, first_description, second_title, second_description } =
      req.body;

    const findData = await aboutavoragroup.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "About Avora Group Not Found",
      });
    }

    if (
      !req.file &&
      !first_title &&
      !first_description &&
      !second_title &&
      !second_description
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide at least one field to update",
      });
    }

    const updateData = {};

    if (req.file) {
      updateData.banner_image = req.file.filename;
    }

    if (first_title) {
      updateData.first_title = first_title.trim();
    }

    if (first_description) {
      updateData.first_description = first_description.trim();
    }

    if (second_title) {
      updateData.second_title = second_title.trim();
    }

    if (second_description) {
      updateData.second_description = second_description.trim();
    }

    await aboutavoragroup.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await aboutavoragroup.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "About Avora Group Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
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
        message: "About Avora Group Not Found",
      });
    }

    await aboutavoragroup.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "About Avora Group Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  Addaboutavoragroup,
  Allaboutavoragroup,
  Updateaboutavoragroup,
  Deleteaboutavoragroup,
};
