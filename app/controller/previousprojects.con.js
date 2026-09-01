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

module.exports = {Addpreviousprojects,Allpreviousprojects}