const visionphilosophy = require("../model/vision&philosophy");

const Addvisionphilosophy = async (req, res) => {
  try {
    const { description} = req.body;
    
    if (!description ) {
      return res.status(400).json({
        status: false,
        message: "Provide Description",
      });
    }
    const createData = await visionphilosophy.create({
      description,
    });

    return res.status(201).json({
      status: true,
      message: "visionphilosophy Added Successfully",
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

const Allvisionphilosophy = async (req, res) => {
  try {
    const findData = await visionphilosophy.findAll();

    return res.status(200).json({
      status: true,
      message: "Allvisionphilosophy Fetched Successfully",
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

module.exports = {Addvisionphilosophy,Allvisionphilosophy}