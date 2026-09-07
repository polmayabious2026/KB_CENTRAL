const smartfeatures = require("../model/smart-features");
const smartfeaturesoption = require("../model/smartfeatureoption");

const Addsmartfeatures = async (req, res) => {
  try {
    const { options } = req.body;

    if (!options) {
      return res.status(400).json({
        status: false,
        message: "Options are required",
      });
    }

    let parsedOptions;

    if (typeof options === "string") {
      try {
        parsedOptions = JSON.parse(options);
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Options must be a valid JSON array",
        });
      }
    } else {
      parsedOptions = options;
    }

    if (!Array.isArray(parsedOptions) || parsedOptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option is required",
      });
    }
    const validOptions = parsedOptions.filter(
      (item) => item && item.bulletpoint?.trim() && item.description?.trim(),
    );

    if (validOptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Provide valid bulletpoints and descriptions",
      });
    }

    const newSmartFeature = await smartfeatures.create({});

    const optionsData = validOptions.map((item) => ({
      smartfeature_id: newSmartFeature.id,
      bulletpoint: item.bulletpoint.trim().toUpperCase(),
      description: item.description.trim(),
    }));

    await smartfeaturesoption.bulkCreate(optionsData);

    const result = await smartfeatures.findByPk(newSmartFeature.id, {
      include: [
        {
          model: smartfeaturesoption,
          as: "smartfeatureoptions",
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "Smart Features Added Successfully",
      data: result,
    });
  } catch (error) {
    console.error("Addsmartfeatures Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Allsmartfeatures = async (req, res) => {
  try {
    const findData = await smartfeatures.findAll({
      include: [
        {
          model: smartfeaturesoption,
          as: "smartfeatureoptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Smart Features Fetched Successfully",
      data: findData,
    });
  } catch (error) {
    console.error("Allsmartfeatures Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Updatesmartfeatures = async (req, res) => {
  try {
    const { id } = req.params;
    const { options } = req.body;

    const findData = await smartfeatures.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Smart Features Not Found",
      });
    }

    if (options === undefined) {
      return res.status(400).json({
        status: false,
        message: "Options are required",
      });
    }

    let parsedOptions;

    if (typeof options === "string") {
      try {
        parsedOptions = JSON.parse(options);
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Options must be a valid JSON array",
        });
      }
    } else {
      parsedOptions = options;
    }

    if (!Array.isArray(parsedOptions)) {
      return res.status(400).json({
        status: false,
        message: "Options must be an array",
      });
    }

    const validOptions = parsedOptions.filter(
      (item) => item && item.bulletpoint?.trim() && item.description?.trim(),
    );

    if (validOptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one valid option is required",
      });
    }

    await smartfeaturesoption.destroy({
      where: {
        smartfeature_id: id,
      },
    });

    const optionsData = validOptions.map((item) => ({
      smartfeature_id: id,
      bulletpoint: item.bulletpoint.trim().toUpperCase(),
      description: item.description.trim(),
    }));

    await smartfeaturesoption.bulkCreate(optionsData);

    const updatedData = await smartfeatures.findByPk(id, {
      include: [
        {
          model: smartfeaturesoption,
          as: "smartfeatureoptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Smart Features Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Updatesmartfeatures Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Deletesmartfeatures = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await smartfeatures.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Smart Features Not Found",
      });
    }

    await smartfeaturesoption.destroy({
      where: {
        smartfeature_id: id,
      },
    });

    await smartfeatures.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Smart Features Deleted Successfully",
    });
  } catch (error) {
    console.error("Deletesmartfeatures Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  Addsmartfeatures,
  Allsmartfeatures,
  Updatesmartfeatures,
  Deletesmartfeatures,
};
