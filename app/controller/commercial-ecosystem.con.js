const commercialecosystem = require("../model/commercial-ecosystem");
const commercialoption = require("../model/commercialoptions");

const AddCommercialEcosystem = async (req, res) => {
  try {
    const { title, option } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }

    let options;

    if (Array.isArray(option)) {
      options = option;
    } else {
      try {
        options = JSON.parse(option);
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Invalid options format",
        });
      }
    }

    if (!Array.isArray(options) || options.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option is required",
      });
    }

    const filteredOptions = options.filter(
      (item) => typeof item === "string" && item.trim(),
    );

    if (filteredOptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one valid option is required",
      });
    }

    const upperCaseTitle = title.trim().toUpperCase();

    const newData = await commercialecosystem.create({
      image: req.file.filename,
      title: upperCaseTitle,
    });

    const optionsData = filteredOptions.map((item) => ({
      commercial_id: newData.id,
      option: item.trim(),
    }));

    await commercialoption.bulkCreate(optionsData);

    return res.status(201).json({
      status: true,
      message: "Commercial Ecosystem Added Successfully",
      data: {
        id: newData.id,
        image: newData.image,
        title: newData.title,
        options: optionsData,
      },
    });
  } catch (error) {
    console.error("AddCommercialEcosystem Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const FindAllCommercialData = async (req, res) => {
  try {
    const allData = await commercialecosystem.findAll({
      include: [
        {
          model: commercialoption,
          as: "commercialoption",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Commercial Ecosystem Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("FindAllCommercialData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateCommercialEcosystem = async (req, res) => {
  try {
    const { commercial_id } = req.params;
    const { title, option } = req.body;

    const commercialData = await commercialecosystem.findByPk(commercial_id);

    if (!commercialData) {
      return res.status(404).json({
        status: false,
        message: "Commercial Ecosystem Not Found",
      });
    }

    if (req.file) {
      commercialData.image = req.file.filename;
    }

    if (title && title.trim()) {
      commercialData.title = title.trim().toUpperCase();
    }

    await commercialData.save();

    if (option !== undefined) {
      let options;

      if (Array.isArray(option)) {
        options = option;
      } else {
        try {
          options = JSON.parse(option);
        } catch (error) {
          return res.status(400).json({
            status: false,
            message: "Invalid options format",
          });
        }
      }

      if (!Array.isArray(options)) {
        return res.status(400).json({
          status: false,
          message: "Options must be an array",
        });
      }

      const filteredOptions = options.filter(
        (item) => typeof item === "string" && item.trim(),
      );

      await commercialoption.destroy({
        where: {
          commercial_id: commercial_id,
        },
      });

      if (filteredOptions.length > 0) {
        const optionsData = filteredOptions.map((item) => ({
          commercial_id: commercial_id,
          option: item.trim(),
        }));

        await commercialoption.bulkCreate(optionsData);
      }
    }

    const updatedData = await commercialecosystem.findByPk(commercial_id, {
      include: [
        {
          model: commercialoption,
          as: "commercialoptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Commercial Ecosystem Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("UpdateCommercialEcosystem Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const DeleteCommercialEcosystem = async (req, res) => {
  try {
    const { commercial_id } = req.params;

    const commercialData = await commercialecosystem.findByPk(commercial_id);

    if (!commercialData) {
      return res.status(404).json({
        status: false,
        message: "Commercial Ecosystem Not Found",
      });
    }

   
    await commercialoption.destroy({
      where: {
        commercial_id: commercial_id,
      },
    });

  
    await commercialData.destroy();

    return res.status(200).json({
      status: true,
      message: "Commercial Ecosystem and its options deleted successfully",
    });
  } catch (error) {
    console.error("DeleteCommercialEcosystem Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddCommercialEcosystem,
  FindAllCommercialData,
  UpdateCommercialEcosystem,
  DeleteCommercialEcosystem,
};
