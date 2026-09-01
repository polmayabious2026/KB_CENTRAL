const retailbrands = require("../model/retail&brands");

const Addretailbrands = async (req, res) => {
  try {
    const { bold_title } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title ) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await retailbrands.create({
      bold_title: uppercaseBoldtitle,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "retailbrands Added Successfully",
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

const Allretailbrands = async (req, res) => {
  try {
    const findData = await retailbrands.findAll();

    return res.status(200).json({
      status: true,
      message: "All retailbrands Fetched Successfully",
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

module.exports = {Addretailbrands,Allretailbrands}