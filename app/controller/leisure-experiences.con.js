const leisureexperiences = require("../model/leisure-experiences");
const leisureoptions = require("../model/leisureoptions");


// ==========================================
// ADD LEISURE
// ==========================================
const Addleisure = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { option_title } = req.body;

    // option_title can be:
    // ["Swimming", "Golf", "Spa"]
    //
    // OR if FormData sends it as a string:
    // '["Swimming","Golf","Spa"]'

    let titles = option_title;

    if (typeof titles === "string") {
      try {
        titles = JSON.parse(titles);
      } catch (error) {
        titles = [titles];
      }
    }

    if (!Array.isArray(titles)) {
      titles = [titles];
    }

    // Get all uploaded images
    const images = req.files?.option_image || [];

    if (!titles || titles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please provide at least one option title",
      });
    }

    if (images.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one option image",
      });
    }

    if (titles.length !== images.length) {
      return res.status(400).json({
        status: false,
        message:
          "Number of option titles and option images must be the same",
      });
    }

    // Create parent
    const newLeisure = await leisureexperiences.create({});

    // Create options
    const optionsData = titles.map((title, index) => ({
      leisure_id: newLeisure.id,
      option_title: title.trim(),
      option_image: images[index].filename,
    }));

    await leisureoptions.bulkCreate(optionsData);

    // Get complete data
    const completeData = await leisureexperiences.findByPk(
      newLeisure.id,
      {
        include: [
          {
            model: leisureoptions,
            as: "options",
          },
        ],
      }
    );

    return res.status(201).json({
      status: true,
      message: "Leisure Details Added Successfully",
      data: completeData,
    });

  } catch (error) {
    console.error("Addleisure Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL LEISURE
// ==========================================
const FindAllLeisureData = async (req, res) => {
  try {
    const allData = await leisureexperiences.findAll({
      include: [
        {
          model: leisureoptions,
          as: "options",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Leisure Details Fetched Successfully",
      data: allData,
    });

  } catch (error) {
    console.error("FindAllLeisureData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE LEISURE
// ==========================================
const UpdateLeisure = async (req, res) => {
  try {
    const { leisure_id } = req.params;
    const { option_title } = req.body;

    const leisureData = await leisureexperiences.findByPk(
      leisure_id
    );

    if (!leisureData) {
      return res.status(404).json({
        status: false,
        message: "Leisure Details Not Found",
      });
    }

    // Parse titles
    let titles = option_title;

    if (typeof titles === "string") {
      try {
        titles = JSON.parse(titles);
      } catch (error) {
        titles = [titles];
      }
    }

    if (titles !== undefined && !Array.isArray(titles)) {
      titles = [titles];
    }

    const images = req.files?.option_image || [];

    /*
      If option_title or option_image is sent,
      replace all existing options.
    */
    if (titles !== undefined || images.length > 0) {

      if (!titles || titles.length === 0) {
        return res.status(400).json({
          status: false,
          message: "Please provide option titles",
        });
      }

      if (images.length === 0) {
        return res.status(400).json({
          status: false,
          message: "Please upload option images",
        });
      }

      if (titles.length !== images.length) {
        return res.status(400).json({
          status: false,
          message:
            "Number of option titles and option images must be the same",
        });
      }

      // Delete old options
      await leisureoptions.destroy({
        where: {
          leisure_id: leisure_id,
        },
      });

      // Create new options
      const optionsData = titles.map((title, index) => ({
        leisure_id: leisure_id,
        option_title: title.trim(),
        option_image: images[index].filename,
      }));

      await leisureoptions.bulkCreate(optionsData);
    }

    // Get updated data
    const updatedData = await leisureexperiences.findByPk(
      leisure_id,
      {
        include: [
          {
            model: leisureoptions,
            as: "options",
          },
        ],
      }
    );

    return res.status(200).json({
      status: true,
      message: "Leisure Details Updated Successfully",
      data: updatedData,
    });

  } catch (error) {
    console.error("UpdateLeisure Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE LEISURE
// ==========================================
const DeleteLeisure = async (req, res) => {
  try {
    const { leisure_id } = req.params;

    const leisureData = await leisureexperiences.findByPk(
      leisure_id
    );

    if (!leisureData) {
      return res.status(404).json({
        status: false,
        message: "Leisure Details Not Found",
      });
    }

    // Delete options
    await leisureoptions.destroy({
      where: {
        leisure_id: leisure_id,
      },
    });

    // Delete parent
    await leisureData.destroy();

    return res.status(200).json({
      status: true,
      message: "Leisure Details Deleted Successfully",
    });

  } catch (error) {
    console.error("DeleteLeisure Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


module.exports = {
  Addleisure,
  FindAllLeisureData,
  UpdateLeisure,
  DeleteLeisure,
};
