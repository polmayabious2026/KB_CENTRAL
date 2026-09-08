const experience = require("../model/experience");

const Addexperience = async (req, res) => {
  try {
    const {
      first_title,
      first_description,
      second_title,
      second_description,
      third_title,
      third_description,
      last_title,
      last_description,
    } = req.body;

    // Validate text fields
    if (
      !first_title ||
      !first_description ||
      !second_title ||
      !second_description ||
      !third_title ||
      !third_description ||
      !last_title ||
      !last_description
    ) {
      return res.status(400).json({
        status: false,
        message: "All title and description fields are required",
      });
    }

    if (
      !req.files ||
      !req.files.banner_image ||
      !req.files.first_image ||
      !req.files.second_image ||
      !req.files.third_image ||
      !req.files.last_image
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Banner image, first image, second image, third image and last image are required",
      });
    }

    const createData = await experience.create({
      banner_image: req.files.banner_image[0].filename,

      first_title: first_title.trim(),
      first_description: first_description.trim(),
      first_image: req.files.first_image[0].filename,

      second_title: second_title.trim(),
      second_description: second_description.trim(),
      second_image: req.files.second_image[0].filename,

      third_title: third_title.trim(),
      third_description: third_description.trim(),
      third_image: req.files.third_image[0].filename,

      last_title: last_title.trim(),
      last_description: last_description.trim(),
      last_image: req.files.last_image[0].filename,
    });

    return res.status(201).json({
      status: true,
      message: "Experience Added Successfully",
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

const Allexperience = async (req, res) => {
  try {
    const findData = await experience.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "All Experiences Fetched Successfully",
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

const Singleexperience = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await experience.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Experience Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Experience Fetched Successfully",
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

const Updateexperience = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      first_title,
      first_description,
      second_title,
      second_description,
      third_title,
      third_description,
      last_title,
      last_description,
    } = req.body;

    const findData = await experience.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Experience Not Found",
      });
    }

    const updateData = {};

    if (first_title !== undefined) {
      updateData.first_title = first_title.trim();
    }

    if (first_description !== undefined) {
      updateData.first_description = first_description.trim();
    }

    if (second_title !== undefined) {
      updateData.second_title = second_title.trim();
    }

    if (second_description !== undefined) {
      updateData.second_description = second_description.trim();
    }

    if (third_title !== undefined) {
      updateData.third_title = third_title.trim();
    }

    if (third_description !== undefined) {
      updateData.third_description = third_description.trim();
    }

    if (last_title !== undefined) {
      updateData.last_title = last_title.trim();
    }

    if (last_description !== undefined) {
      updateData.last_description = last_description.trim();
    }

    if (req.files) {
      if (req.files.banner_image && req.files.banner_image.length > 0) {
        updateData.banner_image = req.files.banner_image[0].filename;
      }

      if (req.files.first_image && req.files.first_image.length > 0) {
        updateData.first_image = req.files.first_image[0].filename;
      }

      if (req.files.second_image && req.files.second_image.length > 0) {
        updateData.second_image = req.files.second_image[0].filename;
      }

      if (req.files.third_image && req.files.third_image.length > 0) {
        updateData.third_image = req.files.third_image[0].filename;
      }

      if (req.files.last_image && req.files.last_image.length > 0) {
        updateData.last_image = req.files.last_image[0].filename;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Provide at least one field or image to update",
      });
    }

    await experience.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await experience.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Experience Updated Successfully",
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

const Deleteexperience = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await experience.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Experience Not Found",
      });
    }

    await experience.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Experience Deleted Successfully",
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
  Addexperience,
  Allexperience,
  Singleexperience,
  Updateexperience,
  Deleteexperience,
};
