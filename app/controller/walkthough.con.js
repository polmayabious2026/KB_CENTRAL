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
const UpdateVideo = async (req, res) => {
  try {
    const { walkthrough_id } = req.params;

    const video = req.files?.video?.[0]?.filename;

    const videoData = await walkthrough.findByPk(walkthrough_id);

    if (!videoData) {
      return res.status(404).json({
        status: false,
        message: "Walkthrough Video Not Found",
      });
    }

    if (video) {
      videoData.video = video;
    }

    await videoData.save();

    return res.status(200).json({
      status: true,
      message: "Video Updated Successfully",
      data: videoData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const DeleteVideo = async (req, res) => {
  try {
    const { walkthrough_id } = req.params;

    const videoData = await walkthrough.findByPk(walkthrough_id);

    if (!videoData) {
      return res.status(404).json({
        status: false,
        message: "Walkthrough Video Not Found",
      });
    }

    await videoData.destroy();

    return res.status(200).json({
      status: true,
      message: "Video Deleted Successfully",
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
  Addvideo,
  FindAllVideo,
  UpdateVideo,
  DeleteVideo
};
