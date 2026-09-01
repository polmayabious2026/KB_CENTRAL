const smartfeatures = require("../model/smart-features");

const Addsmartfeatures = async (req, res) => {
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
    } = req.body;
    if (
      !bulletpoint_one ||
      !bulletpoint_two ||
      !bulletpoint_three ||
      !bulletpoint_four 
     
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
      !description_four 
      
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide All Descriptions",
      });
    }
    const uppercasebulletpoint_one = bulletpoint_one.trim(" ").toUpperCase();
    const uppercasedescription_two = description_two.trim(" ").toUpperCase();
    const uppercasedescription_three = description_three
      .trim(" ")
      .toUpperCase();
    const uppercasedescription_four = description_four.trim(" ").toUpperCase();
    

    const createData = await smartfeatures.create({
      bulletpoint_one: uppercasebulletpoint_one,
      bulletpoint_two: uppercasedescription_two,
      bulletpoint_three: uppercasedescription_three,
      bulletpoint_four: uppercasedescription_four,
      
     
    });

    return res.status(201).json({
      status: true,
      message: "smartfeatures Added Successfully",
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

const Allsmartfeatures = async (req, res) => {
  try {
    const findData = await smartfeatures.findAll();

    return res.status(200).json({
      status: true,
      message: "All smartfeatures Fetched Successfully",
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

module.exports = { Addsmartfeatures, Allsmartfeatures };
