const previousprojects = require("../model/previous-projects");

const Addpreviousprojects = async (req, res) => {
  try {
    const { title,description} = req.body;
    
    if (!description || !title) {
      return res.status(400).json({
        status: false,
        message: "Provide Description or Title",
      });
    }
    if(!req.file){
        return res.status(400).json({
            status:false,
            message:"Provide Image"
        })
    }
    const uppercaseTitle = title.trim("").toUpperCase();
    const createData = await previousprojects.create({
      description,
      title:uppercaseTitle,
      image:req.file.filename,

    });

    return res.status(201).json({
      status: true,
      message: "previousprojects Added Successfully",
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

const Allpreviousprojects = async (req, res) => {
  try {
    const findData = await previousprojects.findAll();

    return res.status(200).json({
      status: true,
      message: "Allpreviousprojects Fetched Successfully",
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
const Updatepreviousprojects = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const findData = await previousprojects.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "previousprojects Not Found",
      });
    }

    if (!title && !description && !req.file) {
      return res.status(400).json({
        status: false,
        message: "Provide Title, Description Or Image",
      });
    }

    const updateData = {};

    if (title) {
      updateData.title = title.trim().toUpperCase();
    }

    if (description) {
      updateData.description = description;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await previousprojects.update(updateData, {
      where: {
        id: id,
      },
    });

    const updatedData = await previousprojects.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "previousprojects Updated Successfully",
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

const Deletepreviousprojects = async (req, res) => {
  try {
    const { id } = req.params;

    const findData = await previousprojects.findByPk(id);

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "previousprojects Not Found",
      });
    }

    await previousprojects.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "previousprojects Deleted Successfully",
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
  Addpreviousprojects,
  Allpreviousprojects,
  Updatepreviousprojects,
  Deletepreviousprojects,
};
