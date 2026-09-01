
const coverphoto = require("../model/coverphotos")

const Addcoverphoto = async (req, res) => {
  try {
    // console.log("FILE:", req.file);
    const {start_title,bold_title,end_title}= req.body;
    // console.log("BODY:", req.body);
     if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Coverphoto is required",
            });
        }
     if (!bold_title) {
            return res.status(400).json({
                status: false,
                message: "Bold Title is required",
            });
        }
    
    const upperCasestarttitle = start_title.trim("").toUpperCase();
    const upperCaseboldtitle = bold_title.trim("").toUpperCase();
    const newcoverphoto = await coverphoto.create({
      image:req.file.filename,
      start_title:upperCasestarttitle,
      bold_title:upperCaseboldtitle,
      end_title:end_title,

    });
    return res.status(201).json({
      status: true,
      message: "Coverphoto with Title Added Successfully",
      data: newcoverphoto,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};
const FindAllCover = async (req, res) => {
  try {
    const allCover = await coverphoto.findAll();
    return res.status(200).json({
      status: true,
      message: "All Covers Fetched Successfully",
      data: allCover,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateCoverphoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_title, bold_title, end_title } = req.body;

    const coverDetails = await coverphoto.findByPk(id);

    if (!coverDetails) {
      return res.status(404).json({
        status: false,
        message: "Coverphoto Not Found",
      });
    }

    if (!req.file && !start_title && !bold_title && !end_title) {
      return res.status(400).json({
        status: false,
        message: "Coverphoto or Title is required",
      });
    }

    if (req.file) {
      coverDetails.image = req.file.filename;
    }

    if (start_title) {
      coverDetails.start_title = start_title.trim().toUpperCase();
    }

    if (bold_title) {
      coverDetails.bold_title = bold_title.trim().toUpperCase();
    }

    if (end_title) {
      coverDetails.end_title = end_title;
    }

    await coverDetails.save();

    return res.status(200).json({
      status: true,
      message: "Coverphoto with Title Updated Successfully",
      data: coverDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};

const DeleteCoverphoto = async (req, res) => {
  try {
    const { id } = req.params;

    const coverDetails = await coverphoto.findByPk(id);

    if (!coverDetails) {
      return res.status(404).json({
        status: false,
        message: "Coverphoto Not Found",
      });
    }

    await coverDetails.destroy();

    return res.status(200).json({
      status: true,
      message: "Coverphoto Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
};

module.exports = {
  Addcoverphoto,
  FindAllCover,
  UpdateCoverphoto,
  DeleteCoverphoto,
};


