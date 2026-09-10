const floorplans = require("../model/floor-plans");
const floorplanoptions = require("../model/floorplansoption");

const AddFloorPlans = async (req, res) => {
  try {
    // console.log("FILES:", req.files);
    // console.log("BODY:", req.body);

    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one floor image",
      });
    }

    const newFloorPlan = await floorplans.create({});

    const floorImages = files.map((file) => ({
      floorplans_id: String(newFloorPlan.id),
      floorimage: file.filename,
    }));

    const options = await floorplanoptions.bulkCreate(floorImages);

    return res.status(201).json({
      status: true,
      message: "Floor Plans Added Successfully",
      data: {
        ...newFloorPlan.toJSON(),
        floorimages: options,
      },
    });
  } catch (error) {
    console.log("AddFloorPlans Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const FindAllFloorData = async (req, res) => {
  try {
    const allFloorPlans = await floorplans.findAll({
      order: [["id", "DESC"]],
    });

    const data = await Promise.all(
      allFloorPlans.map(async (floorPlan) => {
        const images = await floorplanoptions.findAll({
          where: {
            floorplans_id: String(floorPlan.id),
          },
          order: [["id", "ASC"]],
        });

        return {
          ...floorPlan.toJSON(),
          floorimages: images,
        };
      }),
    );

    return res.status(200).json({
      status: true,
      message: "All FloorPlans Details Fetched Successfully",
      data,
    });
  } catch (error) {
    console.log("FindAllFloorData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const FindFloorPlanById = async (req, res) => {
  try {
    const { floor_id } = req.params;

    const floorPlan = await floorplans.findByPk(floor_id);

    if (!floorPlan) {
      return res.status(404).json({
        status: false,
        message: "Floor Plans Not Found",
      });
    }

    const images = await floorplanoptions.findAll({
      where: {
        floorplans_id: String(floorPlan.id),
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Floor Plans Details Fetched Successfully",
      data: {
        ...floorPlan.toJSON(),
        floorimages: images,
      },
    });
  } catch (error) {
    console.log("FindFloorPlanById Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const UpdateFloorPlans = async (req, res) => {
  try {
    // console.log("FILES:", req.files);

    const { floor_id } = req.params;

    const floorPlan = await floorplans.findByPk(floor_id);

    if (!floorPlan) {
      return res.status(404).json({
        status: false,
        message: "Floor Plans Not Found",
      });
    }

    const files = req.files || [];

    if (files.length > 0) {
      await floorplanoptions.destroy({
        where: {
          floorplans_id: String(floorPlan.id),
        },
      });

      const newImages = files.map((file) => ({
        floorplans_id: String(floorPlan.id),
        floorimage: file.filename,
      }));

      await floorplanoptions.bulkCreate(newImages);
    }

    const images = await floorplanoptions.findAll({
      where: {
        floorplans_id: String(floorPlan.id),
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Floor Plans Updated Successfully",
      data: {
        ...floorPlan.toJSON(),
        floorimages: images,
      },
    });
  } catch (error) {
    console.log("UpdateFloorPlans Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const DeleteFloorPlans = async (req, res) => {
  try {
    const { floor_id } = req.params;

    const floorPlan = await floorplans.findByPk(floor_id);

    if (!floorPlan) {
      return res.status(404).json({
        status: false,
        message: "Floor Plans Not Found",
      });
    }

    await floorplanoptions.destroy({
      where: {
        floorplans_id: String(floorPlan.id),
      },
    });

    await floorPlan.destroy();

    return res.status(200).json({
      status: true,
      message: "Floor Plans Deleted Successfully",
    });
  } catch (error) {
    console.log("DeleteFloorPlans Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddFloorPlans,
  FindAllFloorData,
  FindFloorPlanById,
  UpdateFloorPlans,
  DeleteFloorPlans,
};
