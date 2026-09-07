const about = require("../model/about");
const aboutoption = require("../model/aboutoption");


const AddAboutDetails = async (req, res) => {
  try {
    let { description } = req.body;
    if (typeof description === "string") {
      try {
        description = JSON.parse(description);
      } catch (error) {
        description = [description];
      }
    }

    if (!Array.isArray(description)) {
      description = [description];
    }

 
    const descriptions = description
      .filter((item) => item && item.trim())
      .map((item) => item.trim());

    if (descriptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one description is required",
      });
    }

    const newAbout = await about.create({});
    const descriptionData = descriptions.map((item) => ({
      about_id: newAbout.id,
      description: item,
    }));

    await aboutoption.bulkCreate(descriptionData);

    const completeData = await about.findByPk(newAbout.id, {
      include: [
        {
          model: aboutoption,
          as: "descriptions",
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "About Page Details Added Successfully",
      data: completeData,
    });

  } catch (error) {
    console.error("AddAboutDetails Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const FindAllAbout = async (req, res) => {
  try {
    const allAboutDetails = await about.findAll({
      include: [
        {
          model: aboutoption,
          as: "descriptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All About Details Fetched Successfully",
      data: allAboutDetails,
    });

  } catch (error) {
    console.error("FindAllAbout Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const UpdateAboutDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let { description } = req.body;

    const aboutDetails = await about.findByPk(id);

    if (!aboutDetails) {
      return res.status(404).json({
        status: false,
        message: "About Details Not Found",
      });
    }

  
    if (typeof description === "string") {
      try {
        description = JSON.parse(description);
      } catch (error) {
        description = [description];
      }
    }

    if (!Array.isArray(description)) {
      description = [description];
    }

    const descriptions = description
      .filter((item) => item && item.trim())
      .map((item) => item.trim());

    if (descriptions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one description is required",
      });
    }


    await aboutoption.destroy({
      where: {
        about_id: id,
      },
    });

  
    const descriptionData = descriptions.map((item) => ({
      about_id: id,
      description: item,
    }));

    await aboutoption.bulkCreate(descriptionData);

    const updatedData = await about.findByPk(id, {
      include: [
        {
          model: aboutoption,
          as: "descriptions",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "About Page Details Updated Successfully",
      data: updatedData,
    });

  } catch (error) {
    console.error("UpdateAboutDetails Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};



const DeleteAboutDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const aboutDetails = await about.findByPk(id);

    if (!aboutDetails) {
      return res.status(404).json({
        status: false,
        message: "About Details Not Found",
      });
    }

   
    await aboutoption.destroy({
      where: {
        about_id: id,
      },
    });

    
    await aboutDetails.destroy();

    return res.status(200).json({
      status: true,
      message: "About Page Details Deleted Successfully",
    });

  } catch (error) {
    console.error("DeleteAboutDetails Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


module.exports = {
  AddAboutDetails,
  FindAllAbout,
  UpdateAboutDetails,
  DeleteAboutDetails,
};
