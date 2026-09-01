const accessibility = require("../model/accessibility");

const Addaccessibility = async (req, res) => {
  try {
    const {
      bulletpoint_one,
      description_one,
      bulletpoint_two,
      description_two,
      bulletpoint_three,
      description_three,
      bulletpoint_four,
      description_four,
      bulletpoint_five,
      description_five,
    } = req.body;
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }
    if (
      !bulletpoint_one ||
      !bulletpoint_two ||
      !bulletpoint_three ||
      !bulletpoint_four ||
      !bulletpoint_five
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide All BulletPoints",
      });
    }
    if (
      !description_one ||
      !description_two ||
      !description_three ||
      !description_four ||
      !description_five
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide All Descriptions",
      });
    }
    const uppercasebulletpoint_one = bulletpoint_one.trim().toUpperCase();
    const uppercasebulletpoint_two = bulletpoint_two.trim().toUpperCase();
    const uppercasebulletpoint_three = bulletpoint_three.trim().toUpperCase();
    const uppercasebulletpoint_four = bulletpoint_four.trim().toUpperCase();
    const uppercasebulletpoint_five = bulletpoint_five.trim().toUpperCase();

    const createData = await accessibility.create({
      bulletpoint_one: uppercasebulletpoint_one,
      description_one,
      bulletpoint_two: uppercasebulletpoint_two,
      description_two,
      bulletpoint_three: uppercasebulletpoint_three,
      description_three,
      bulletpoint_four: uppercasebulletpoint_four,
      description_four,
      bulletpoint_five: uppercasebulletpoint_five,
      description_five,
      image: req.file.filename,
    });

    return res.status(201).json({
      status: true,
      message: "Accessibility Added Successfully",
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

const Allaccessibility = async (req, res) => {
  try {
    const findData = await accessibility.findAll();

    return res.status(200).json({
      status: true,
      message: "All accessibility Fetched Successfully",
      data: findData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error:error.message,
    });
  }
};

module.exports = { Addaccessibility, Allaccessibility };
