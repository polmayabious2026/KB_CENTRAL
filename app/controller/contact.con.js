const contact = require("../model/contact");

const Addcontact = async (req, res) => {
  try {
    const { phone_no,email,altername_email,address } = req.body;
    if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
    if (!phone_no||!email||!altername_email||!address) {
      return res.status(400).json({
        status: false,
        message: "Provide All Details ",
      });
    }
    const createData = await contact.create({
     phone_no,
     email,
     altername_email,
     address ,
    image:req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "Contact Details Added Successfully",
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

const Allcontact = async (req, res) => {
  try {
    const findData = await contact.findAll();

    return res.status(200).json({
      status: true,
      message: "All Contact Details Fetched Successfully",
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

module.exports = {Addcontact,Allcontact}