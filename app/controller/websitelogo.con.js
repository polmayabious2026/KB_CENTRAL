const websitelogo = require("../model/websitelogo")

const addLogo = async (req, res) => {
  try {
    // console.log("FILE:", req.file);
     if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Logo image is required",
            });
        }

    const newlogo = await websitelogo.create({
      logoimage:req.file.filename,
    });
    return res.status(201).json({
      status: true,
      message: "Logo Added Successfully",
      data: newlogo,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};













module.exports = {addLogo}