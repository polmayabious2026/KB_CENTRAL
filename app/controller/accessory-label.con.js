const accessorylabels = require("../model/accessory-labels");
const accessorylabeloption = require("../model/accessorylablesoption");

const Addaccessorylabels = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { bold_title, description_start, description_end, option } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }

    if (!bold_title || !description_start || !description_end) {
      return res.status(400).json({
        status: false,
        message:
          "Bold title, Description start and Description end are required",
      });
    }

    let options = option;

    if (typeof options === "string") {
      try {
        options = JSON.parse(options);
      } catch (error) {
        options = [options];
      }
    }

    if (!Array.isArray(options)) {
      options = [options];
    }

    const filteredOptions = options
      .filter((item) => item && item.trim())
      .map((item) => item.trim());

    if (filteredOptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option is required",
      });
    }

    const newData = await accessorylabels.create({
      image: req.file.filename,
      bold_title: bold_title.trim().toUpperCase(),
      description_start: description_start.trim(),
      description_end: description_end.trim(),
    });

    const optionsData = filteredOptions.map((item) => ({
      accessorylabel_id: newData.id,
      option: item,
    }));

    await accessorylabeloption.bulkCreate(optionsData);

    const completeData = await accessorylabels.findByPk(newData.id, {
      include: [
        {
          model: accessorylabeloption,
          as: "options",
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "Accessory Labels Added Successfully",
      data: completeData,
    });
  } catch (error) {
    console.error("Addaccessorylabels Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const AllaccessorylabelsData = async (req, res) => {
  try {
    const allData = await accessorylabels.findAll({
      include: [
        {
          model: accessorylabeloption,
          as: "options",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Accessory Labels Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("AllaccessorylabelsData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Updateaccessorylabels = async (req, res) => {
  try {
    const { id } = req.params;

    const { bold_title, description_start, description_end, option } = req.body;

    const findData = await accessorylabels.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Accessory Labels Not Found",
      });
    }

    const updateData = {};

    if (bold_title !== undefined) {
      updateData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description_start !== undefined) {
      updateData.description_start = description_start.trim();
    }

    if (description_end !== undefined) {
      updateData.description_end = description_end.trim();
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    if (Object.keys(updateData).length > 0) {
      await accessorylabels.update(updateData, {
        where: {
          id: id,
        },
      });
    }

    if (option !== undefined) {
      let options = option;

      if (typeof options === "string") {
        try {
          options = JSON.parse(options);
        } catch (error) {
          options = [options];
        }
      }

      if (!Array.isArray(options)) {
        options = [options];
      }

      const filteredOptions = options
        .filter((item) => item && item.trim())
        .map((item) => item.trim());

      if (filteredOptions.length === 0) {
        return res.status(400).json({
          status: false,
          message: "At least one option is required",
        });
      }

      await accessorylabeloption.destroy({
        where: {
          accessorylabel_id: id,
        },
      });

      const optionsData = filteredOptions.map((item) => ({
        accessorylabel_id: id,
        option: item,
      }));

      await accessorylabeloption.bulkCreate(optionsData);
    }

    const updatedData = await accessorylabels.findByPk(id, {
      include: [
        {
          model: accessorylabeloption,
          as: "options",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Accessory Labels Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Updateaccessorylabels Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Deleteaccessorylabels = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await accessorylabels.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Accessory Labels Not Found",
      });
    }

    await accessorylabeloption.destroy({
      where: {
        accessorylabel_id: id,
      },
    });

    await findData.destroy();

    return res.status(200).json({
      status: true,
      message: "Accessory Labels Deleted Successfully",
    });
  } catch (error) {
    console.error("Deleteaccessorylabels Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  Addaccessorylabels,
  AllaccessorylabelsData,
  Updateaccessorylabels,
  Deleteaccessorylabels,
};
