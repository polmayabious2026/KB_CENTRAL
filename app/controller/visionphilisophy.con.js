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
const Updatevisionphilosophy = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const findData = await visionphilosophy.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "visionphilosophy Not Found",
      });
    }

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Provide Description",
      });
    }

    await visionphilosophy.update(
      {
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const updatedData = await visionphilosophy.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "visionphilosophy Updated Successfully",
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

const Deletevisionphilosophy = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await visionphilosophy.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "visionphilosophy Not Found",
      });
    }

    await visionphilosophy.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "visionphilosophy Deleted Successfully",
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
  Addvisionphilosophy,
  Allvisionphilosophy,
  Updatevisionphilosophy,
  Deletevisionphilosophy,
};
