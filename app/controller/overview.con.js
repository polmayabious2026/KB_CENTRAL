const overviews = require("../model/overview");

const AddOverview = async (req, res) => {
  try {
    const { bold_title, description } = req.body;
    if (!bold_title || !description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await overviews.create({
      bold_title: uppercaseBoldtitle,
      description,
    });

    return res.status(201).json({
      status: true,
      message: "Overviews Added Successfully",
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

const AllOverviews = async (req, res) => {
  try {
    const findData = await overviews.findAll();

    return res.status(200).json({
      status: true,
      message: "All Overviews Fetched Successfully",
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
const UpdateOverview = async (req, res) => {
  try {
    const { overview_id } = req.params;
    const { bold_title, description } = req.body;

    const overviewData = await overviews.findByPk(overview_id);

    if (!overviewData) {
      return res.status(404).json({
        status: false,
        message: "Overview Not Found",
      });
    }

    if (bold_title) {
      overviewData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description) {
      overviewData.description = description;
    }

    await overviewData.save();

    return res.status(200).json({
      status: true,
      message: "Overview Updated Successfully",
      data: overviewData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};


const DeleteOverview = async (req, res) => {
  try {
    const { overview_id } = req.params;

    const overviewData = await overviews.findByPk(overview_id);

    if (!overviewData) {
      return res.status(404).json({
        status: false,
        message: "Overview Not Found",
      });
    }

    await overviewData.destroy();

    return res.status(200).json({
      status: true,
      message: "Overview Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  AddOverview,
  AllOverviews,
  UpdateOverview,
  DeleteOverview,
};