const project_vision = require("../model/project_vission");
const key_highlights_option = require("../model/key_highlights_points");

const createProjectVision = async (req, res) => {
  const transaction = await project_vision.sequelize.transaction();

  try {
    const {
      first_title,
      first_description,
      second_title,
      second_description,
      third_title,
      third_description,
      last_title,
      last_description,
      // key_highlights_title,
      key_highlights_options,
    } = req.body;

    const bannerImage = req.files?.banner_image?.[0];
    const secondImage = req.files?.second_image?.[0];
    const thirdImage = req.files?.third_image?.[0];
    const lastImage = req.files?.last_image?.[0];

    if (!bannerImage || !secondImage || !thirdImage || !lastImage) {
      await transaction.rollback();

      return res.status(400).json({
        success: false,
        message:
          "All four images are required: banner_image, second_image, third_image and last_image",
      });
    }

    const projectVision = await project_vision.create(
      {
        banner_image: bannerImage.filename,

        first_title,
        first_description,

        second_title,
        second_description,
        second_image: secondImage.filename,

        third_title,
        third_description,
        third_image: thirdImage.filename,

        last_title,
        last_description,
        last_image: lastImage.filename,

        
      },
      { transaction },
    );

    let highlightOptions = [];

    if (key_highlights_options) {
      try {
        highlightOptions =
          typeof key_highlights_options === "string"
            ? JSON.parse(key_highlights_options)
            : key_highlights_options;
      } catch (error) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: "key_highlights_options must be a valid JSON array",
        });
      }
    }

    if (Array.isArray(highlightOptions) && highlightOptions.length > 0) {
      const highlightData = highlightOptions.map((option) => ({
        projectvision_id: projectVision.id,
        key_highlight_option: option,
      }));

      await key_highlights_option.bulkCreate(highlightData, {
        transaction,
      });
    }

    await transaction.commit();

    // Get created project
    const result = await project_vision.findByPk(projectVision.id);

    const options = await key_highlights_option.findAll({
      where: {
        projectvision_id: projectVision.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Project vision created successfully",
      data: {
        ...result.toJSON(),
        key_highlights_options: options,
      },
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Create Project Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project vision",
      error: error.message,
    });
  }
};

const getAllProjectVisions = async (req, res) => {
  try {
    const projectVisions = await project_vision.findAll({
      order: [["id", "DESC"]],
    });

    const data = await Promise.all(
      projectVisions.map(async (project) => {
        const options = await key_highlights_option.findAll({
          where: {
            projectvision_id: project.id,
          },
          order: [["id", "ASC"]],
        });

        return {
          ...project.toJSON(),
          key_highlights_options: options,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Project visions fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Get All Project Visions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project visions",
      error: error.message,
    });
  }
};

const getProjectVisionById = async (req, res) => {
  try {
    const { id } = req.params;

    const projectVision = await project_vision.findByPk(id);

    if (!projectVision) {
      return res.status(404).json({
        success: false,
        message: "Project vision not found",
      });
    }

    const options = await key_highlights_option.findAll({
      where: {
        projectvision_id: id,
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Project vision fetched successfully",
      data: {
        ...projectVision.toJSON(),
        key_highlights_options: options,
      },
    });
  } catch (error) {
    console.error("Get Project Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project vision",
      error: error.message,
    });
  }
};

const updateProjectVision = async (req, res) => {
  const transaction = await project_vision.sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      first_title,
      first_description,
      second_title,
      second_description,
      third_title,
      third_description,
      last_title,
      last_description,
      // key_highlights_title,
      key_highlights_options,
    } = req.body;

    const projectVision = await project_vision.findByPk(id);

    if (!projectVision) {
      await transaction.rollback();

      return res.status(404).json({
        success: false,
        message: "Project vision not found",
      });
    }

    const updateData = {
      first_title,
      first_description,

      second_title,
      second_description,

      third_title,
      third_description,

      last_title,
      last_description,

      // key_highlights_title,
    };

    const bannerImage = req.files?.banner_image?.[0];
    const secondImage = req.files?.second_image?.[0];
    const thirdImage = req.files?.third_image?.[0];
    const lastImage = req.files?.last_image?.[0];

    if (bannerImage) {
      updateData.banner_image = bannerImage.filename;
    }

    if (secondImage) {
      updateData.second_image = secondImage.filename;
    }

    if (thirdImage) {
      updateData.third_image = thirdImage.filename;
    }

    if (lastImage) {
      updateData.last_image = lastImage.filename;
    }

    await projectVision.update(updateData, {
      transaction,
    });

    if (key_highlights_options !== undefined) {
      let highlightOptions;

      try {
        highlightOptions =
          typeof key_highlights_options === "string"
            ? JSON.parse(key_highlights_options)
            : key_highlights_options;
      } catch (error) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: "key_highlights_options must be a valid JSON array",
        });
      }

      if (!Array.isArray(highlightOptions)) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: "key_highlights_options must be an array",
        });
      }

      await key_highlights_option.destroy({
        where: {
          projectvision_id: id,
        },
        transaction,
      });

      if (highlightOptions.length > 0) {
        const highlightData = highlightOptions.map((option) => ({
          projectvision_id: id,
          key_highlight_option: option,
        }));

        await key_highlights_option.bulkCreate(highlightData, {
          transaction,
        });
      }
    }

    await transaction.commit();

    const updatedProject = await project_vision.findByPk(id);

    const options = await key_highlights_option.findAll({
      where: {
        projectvision_id: id,
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Project vision updated successfully",
      data: {
        ...updatedProject.toJSON(),
        key_highlights_options: options,
      },
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Update Project Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project vision",
      error: error.message,
    });
  }
};

const deleteProjectVision = async (req, res) => {
  const transaction = await project_vision.sequelize.transaction();

  try {
    const { id } = req.params;

    const projectVision = await project_vision.findByPk(id);

    if (!projectVision) {
      await transaction.rollback();

      return res.status(404).json({
        success: false,
        message: "Project vision not found",
      });
    }

    await key_highlights_option.destroy({
      where: {
        projectvision_id: id,
      },
      transaction,
    });

    await projectVision.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Project vision deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Delete Project Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project vision",
      error: error.message,
    });
  }
};

module.exports = {
  createProjectVision,
  getAllProjectVisions,
  getProjectVisionById,
  updateProjectVision,
  deleteProjectVision,
};
