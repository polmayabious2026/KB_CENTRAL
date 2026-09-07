const globalfashion = require("../model/globalfashion");
const globalfashionoption = require("../model/globalfashionoption");


const Addglobalfashion = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      bold_title,
      description,
      option_title,
    } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        status: false,
        message: "Description is required",
      });
    }

    let optionTitles = option_title;

    if (typeof optionTitles === "string") {
      try {
        optionTitles = JSON.parse(optionTitles);
      } catch (error) {
        optionTitles = [optionTitles];
      }
    }

    if (!Array.isArray(optionTitles)) {
      optionTitles = [optionTitles];
    }

    optionTitles = optionTitles
      .filter((item) => item && item.trim())
      .map((item) => item.trim());

    if (optionTitles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option title is required",
      });
    }

   

    let optionImages = [];

    if (req.files?.option_image) {
      optionImages = req.files.option_image.map(
        (file) => file.filename
      );
    }

    if (optionImages.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one option image is required",
      });
    }

    
    if (optionTitles.length !== optionImages.length) {
      return res.status(400).json({
        status: false,
        message:
          "Number of option titles and option images must be the same",
      });
    }

    
    const newData = await globalfashion.create({
      bold_title: bold_title?.trim() || null,
      description: description.trim(),
    });

   
    const optionsData = optionTitles.map((title, index) => ({
      global_fashion_id: newData.id,
      option_title: title,
      option_image: optionImages[index],
    }));

    await globalfashionoption.bulkCreate(optionsData);


    const completeData = await globalfashion.findByPk(newData.id, {
      include: [
        {
          model: globalfashionoption,
          as: "globalfashionoptions",
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "Global Fashion Added Successfully",
      data: completeData,
    });

  } catch (error) {
    console.error("Addglobalfashion Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const Allglobalfashin = async (req, res) => {
  try {
    const allData = await globalfashion.findAll({
      include: [
        {
          model: globalfashionoption,
          as: "options",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Global Fashion Details Fetched Successfully",
      data: allData,
    });

  } catch (error) {
    console.error("Allglobalfashin Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const Updateglobalfashion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      bold_title,
      description,
      option_title,
    } = req.body;

    const findData = await globalfashion.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Global Fashion Details Not Found",
      });
    }

    const updateData = {};

    if (bold_title !== undefined) {
      updateData.bold_title = bold_title.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (Object.keys(updateData).length > 0) {
      await globalfashion.update(updateData, {
        where: {
          id: id,
        },
      });
    }

    if (
      option_title !== undefined ||
      req.files?.option_image
    ) {
      let optionTitles = option_title;

      if (typeof optionTitles === "string") {
        try {
          optionTitles = JSON.parse(optionTitles);
        } catch (error) {
          optionTitles = [optionTitles];
        }
      }

      if (!Array.isArray(optionTitles)) {
        optionTitles = [optionTitles];
      }

      optionTitles = optionTitles
        .filter((item) => item && item.trim())
        .map((item) => item.trim());

      const optionImages = req.files?.option_image
        ? req.files.option_image.map(
            (file) => file.filename
          )
        : [];

      if (optionTitles.length === 0) {
        return res.status(400).json({
          status: false,
          message: "At least one option title is required",
        });
      }

      if (optionImages.length === 0) {
        return res.status(400).json({
          status: false,
          message: "At least one option image is required",
        });
      }

      if (optionTitles.length !== optionImages.length) {
        return res.status(400).json({
          status: false,
          message:
            "Number of option titles and option images must be the same",
        });
      }


      await globalfashionoption.destroy({
        where: {
          global_fashion_id: id,
        },
      });

      const optionsData = optionTitles.map((title, index) => ({
        global_fashion_id: id,
        option_title: title,
        option_image: optionImages[index],
      }));

      await globalfashionoption.bulkCreate(optionsData);
    }

    const updatedData = await globalfashion.findByPk(id, {
      include: [
        {
          model: globalfashionoption,
          as: "options",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Global Fashion Details Updated Successfully",
      data: updatedData,
    });

  } catch (error) {
    console.error("Updateglobalfashion Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const Deleteglobalfashion = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await globalfashion.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Global Fashion Details Not Found",
      });
    }

 
    await globalfashionoption.destroy({
      where: {
        global_fashion_id: id,
      },
    });

  
    await findData.destroy();

    return res.status(200).json({
      status: true,
      message: "Global Fashion Details Deleted Successfully",
    });

  } catch (error) {
    console.error("Deleteglobalfashion Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


module.exports = {
  Addglobalfashion,
  Allglobalfashin,
  Updateglobalfashion,
  Deleteglobalfashion,
};
