const events = require("../model/events");

const Addevents = async (req, res) => {
  try {
    const { bold_title, description } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!bold_title || !description) {
      return res.status(400).json({
        status: false,
        message: "Provide Title And Description",
      });
    }
    const uppercaseBoldtitle = bold_title.trim(" ").toUpperCase();
    const createData = await events.create({
      bold_title: uppercaseBoldtitle,
      description,
      image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "events Added Successfully",
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

const Allevents = async (req, res) => {
  try {
    const findData = await events.findAll();

    return res.status(200).json({
      status: true,
      message: "All events Fetched Successfully",
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
const Updateevents = async (req, res) => {
  try {
    const { id } = req.params;
    const { bold_title, description } = req.body;

    const findData = await events.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "events Not Found",
      });
    }

    if (!bold_title && !description && !req.file) {
      return res.status(400).json({
        status: false,
        message: "Provide Title, Description Or Image",
      });
    }

    const updateData = {};

    if (bold_title) {
      updateData.bold_title = bold_title.trim().toUpperCase();
    }

    if (description) {
      updateData.description = description;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await events.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await events.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "events Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

const Deleteevents = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await events.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "events Not Found",
      });
    }

    await events.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "events Deleted Successfully",
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
  Addevents,
  Allevents,
  Updateevents,
  Deleteevents,
};
