const ourlegacy = require("../model/our-legacy");

const Addourlegacy = async (req, res) => {
  try {
    const { description} = req.body;
    
    if (!description ) {
      return res.status(400).json({
        status: false,
        message: "Provide Description",
      });
    }
    const createData = await ourlegacy.create({
      description,
    });

    return res.status(201).json({
      status: true,
      message: "ourlegacy Added Successfully",
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

const Allourlegacy = async (req, res) => {
  try {
    const findData = await ourlegacy.findAll();

    return res.status(200).json({
      status: true,
      message: "Allourlegacy Fetched Successfully",
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

module.exports = {Addourlegacy,Allourlegacy}