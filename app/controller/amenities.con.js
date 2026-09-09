const amenities = require("../model/amenities");

const Addamenities = async (req, res) => {
  try {
    const { first_title, first_description, second_title, second_description } =
      req.body;
    console.log(req.body)
    if (
      !first_title ||
      !first_description ||
      !second_title ||
      !second_description
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
      !req.files.second_image
    ) {
      return res.status(400).json({
        status: false,
        message: "Banner image, first image and second image are required",
      });
    }

    const createData = await amenities.create({
      banner_image: req.files.banner_image[0].filename,

      first_title: first_title.trim(),
      first_description: first_description.trim(),
      first_image: req.files.first_image[0].filename,

      second_title: second_title.trim(),
      second_description: second_description.trim(),
      second_image: req.files.second_image[0].filename,
    });

    return res.status(201).json({
      status: true,
      message: "Amenities Added Successfully",
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

const Allamenities = async (req, res) => {
  try {
    const findData = await amenities.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "All Amenities Fetched Successfully",
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

const Singleamenities = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await amenities.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Amenities Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Amenities Fetched Successfully",
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

const Updateamenities = async (req, res) => {
  try {
    const { id } = req.params;

    const { first_title, first_description, second_title, second_description } =
      req.body;

    const findData = await amenities.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Amenities Not Found",
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
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Provide at least one field or image to update",
      });
    }

    await findData.update(updateData);

    return res.status(200).json({
      status: true,
      message: "Amenities Updated Successfully",
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

const Deleteamenities = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await amenities.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Amenities Not Found",
      });
    }

    await amenities.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Amenities Deleted Successfully",
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
  Addamenities,
  Allamenities,
  Singleamenities,
  Updateamenities,
  Deleteamenities,
};
