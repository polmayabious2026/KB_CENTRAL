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
const Updatecontact = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      phone_no,
      email,
      altername_email,
      address,
    } = req.body;

    const findData = await contact.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Contact Details Not Found",
      });
    }

    if (
      !phone_no &&
      !email &&
      !altername_email &&
      !address &&
      !req.file
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide Details To Update",
      });
    }

    const updateData = {};

    if (phone_no) {
      updateData.phone_no = phone_no;
    }

    if (email) {
      updateData.email = email;
    }

    if (altername_email) {
      updateData.altername_email = altername_email;
    }

    if (address) {
      updateData.address = address;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await contact.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await contact.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Contact Details Updated Successfully",
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

const Deletecontact = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await contact.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "Contact Details Not Found",
      });
    }

    await contact.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Contact Details Deleted Successfully",
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
  Addcontact,
  Allcontact,
  Updatecontact,
  Deletecontact,
};
