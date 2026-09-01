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

module.exports = {Addwellness,Allwellness}