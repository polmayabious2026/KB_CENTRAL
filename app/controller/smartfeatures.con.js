const smartfeatures = require("../model/smart-features");

const Addsmartfeatures = async (req, res) => {
  try {

    console.log("============================")

    console.log("Data:",req.body)
    console.log("============================")
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
    const uppercasedescription_two = bulletpoint_two.trim(" ").toUpperCase();
    const uppercasedescription_three = bulletpoint_three
      .trim(" ")
      .toUpperCase();
    const uppercasedescription_four = bulletpoint_four.trim(" ").toUpperCase();
    

    const createData = await smartfeatures.create({
      bulletpoint_one: uppercasebulletpoint_one,
      bulletpoint_two: uppercasedescription_two,
      bulletpoint_three: uppercasedescription_three,
      bulletpoint_four: uppercasedescription_four,
      description_one,
      description_two,
      description_three,
      description_four,
      
     
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
const Updatesmartfeatures = async (req, res) => {
  try {
    const { id } = req.params;

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

    const findData = await smartfeatures.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "smartfeatures Not Found",
      });
    }

    if (
      !bulletpoint_one &&
      !description_one &&
      !bulletpoint_two &&
      !description_two &&
      !bulletpoint_three &&
      !description_three &&
      !bulletpoint_four &&
      !description_four
    ) {
      return res.status(400).json({
        status: false,
        message: "Provide Data To Update",
      });
    }

    const updateData = {};

    if (bulletpoint_one) {
      updateData.bulletpoint_one = bulletpoint_one.trim().toUpperCase();
    }

    if (description_one) {
      updateData.description_one;
    }

    if (bulletpoint_two) {
      updateData.bulletpoint_two = bulletpoint_two.trim().toUpperCase();
    }

    if (description_two) {
      updateData.description_two;
    }

    if (bulletpoint_three) {
      updateData.bulletpoint_three = bulletpoint_three.trim().toUpperCase();
    }

    if (description_three) {
      updateData.description_three;
    }

    if (bulletpoint_four) {
      updateData.bulletpoint_four = bulletpoint_four.trim().toUpperCase();
    }

    if (description_four) {
      updateData.description_four;
    }

    await smartfeatures.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await smartfeatures.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "smartfeatures Updated Successfully",
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

const Deletesmartfeatures = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await smartfeatures.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "smartfeatures Not Found",
      });
    }

    await smartfeatures.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "smartfeatures Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

module.exports = { Addsmartfeatures, Allsmartfeatures, Updatesmartfeatures, Deletesmartfeatures };
