const walkthrough = require("../model/walkthrough");

const Addvideo = async (req, res) => {
  try {
    const video = req.files?.video?.[0]?.filename;

    if (!video) {
      return res.status(400).json({
        status: false,
        message: "Please upload all 5 brand logos",
      });
    }
    const newvideo = await walkthrough.create({
      video,
    });

    return res.status(201).json({
      status: true,
      message: "Video added successfully",
      data: newvideo,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const FindAllVideo = async (req, res) => {
  try {
    const allData = await walkthrough.findAll();
    return res.status(200).json({
      status: true,
      message: "Walkthrough Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


module.exports = {Addvideo,FindAllVideo}