const wellnessspaces = require("../model/wellness-spaces");
const wellnesslogos = require("../model/wellspacesoption");


const AddWellnessSpaces = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title } = req.body;


    if (!title || !title.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }


    const wellnessBackgroundPhoto =
      req.files?.wellness_background_photo?.[0]?.filename;

    if (!wellnessBackgroundPhoto) {
      return res.status(400).json({
        status: false,
        message: "Wellness Background Image is required",
      });
    }

   
    const logoFiles = req.files?.brandlogo || [];

    if (logoFiles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one brand logo",
      });
    }

    const newWellness = await wellnessspaces.create({
      title: title.trim(),
      wellness_background_photo: wellnessBackgroundPhoto,
    });

    const logoData = logoFiles.map((file) => ({
      wellnessspaces_id: newWellness.id,
      brandlogo: file.filename,
    }));

    await wellnesslogos.bulkCreate(logoData);

    const completeData = await wellnessspaces.findByPk(
      newWellness.id,
      {
        include: [
          {
            model: wellnesslogos,
            as: "brandlogooption",
          },
        ],
      }
    );

    return res.status(201).json({
      status: true,
      message: "Wellness Spaces Added Successfully",
      data: completeData,
    });
  } catch (error) {
    console.error("AddWellnessSpaces Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const AllWellnessData = async (req, res) => {
  try {
    const allData = await wellnessspaces.findAll({
      include: [
        {
          model: wellnesslogos,
          as: "brandlogooption",
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "All Wellness Spaces Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("AllWellnessData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const GetWellnessSpace = async (req, res) => {
  try {
    const { id } = req.params;

    const wellnessData = await wellnessspaces.findByPk(id, {
      include: [
        {
          model: wellnesslogos,
          as: "brandlogooption",
        },
      ],
    });

    if (!wellnessData) {
      return res.status(404).json({
        status: false,
        message: "Wellness Spaces Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Wellness Space Details Fetched Successfully",
      data: wellnessData,
    });
  } catch (error) {
    console.error("GetWellnessSpace Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const UpdateWellnessSpaces = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { id } = req.params;
    const { title } = req.body;

   
    const wellnessData = await wellnessspaces.findByPk(id);

    if (!wellnessData) {
      return res.status(404).json({
        status: false,
        message: "Wellness Spaces Not Found",
      });
    }

  
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      wellnessData.title = title.trim();
    }

  
    const wellnessBackgroundPhoto =
      req.files?.wellness_background_photo?.[0]?.filename;

    if (wellnessBackgroundPhoto) {
      wellnessData.wellness_background_photo =
        wellnessBackgroundPhoto;
    }

    await wellnessData.save();

    const logoFiles = req.files?.brandlogo || [];

    
    if (logoFiles.length > 0) {
   
      await wellnesslogos.destroy({
        where: {
          wellnessspaces_id: id,
        },
      });

     
      const logoData = logoFiles.map((file) => ({
        wellnessspaces_id: id,
        brandlogo: file.filename,
      }));

      await wellnesslogos.bulkCreate(logoData);
    }


    const updatedData = await wellnessspaces.findByPk(id, {
      include: [
        {
          model: wellnesslogos,
          as: "brandlogooption",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Wellness Spaces Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("UpdateWellnessSpaces Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


const DeleteWellnessSpaces = async (req, res) => {
  try {
    const { id } = req.params;

  
    const wellnessData = await wellnessspaces.findByPk(id);

    if (!wellnessData) {
      return res.status(404).json({
        status: false,
        message: "Wellness Spaces Not Found",
      });
    }

 
    await wellnesslogos.destroy({
      where: {
        wellnessspaces_id: id,
      },
    });


    await wellnessData.destroy();

    return res.status(200).json({
      status: true,
      message: "Wellness Spaces Deleted Successfully",
    });
  } catch (error) {
    console.error("DeleteWellnessSpaces Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddWellnessSpaces,
  AllWellnessData,
  GetWellnessSpace,
  UpdateWellnessSpaces,
  DeleteWellnessSpaces,
};
