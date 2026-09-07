const strategic = require("../model/strategic-advantages");
const strategicoptions = require("../model/strategicadvantages-options");

const AddStrategicAdvantages = async (req, res) => {
  try {
    // console.log("==========================");
    // console.log("Request Body:", req.body);
    // console.log("==========================");
    const { description, option } = req.body;
    const options = Array.isArray(option) ? option : [option];
    if (!description || options.length === 0 || !options[0]) {
      return res.status(400).json({
        status: false,
        message: "Please provide Description and Options",
      });
    }

    const newStrategyAdvantage = await strategic.create({
      description: description,
    });

    const optionsData = options.map((item) => ({
      strategic_id: newStrategyAdvantage.id,
      option: item,
    }));

    await strategicoptions.bulkCreate(optionsData);
    return res.status(201).json({
      status: true,
      message: "Description With Advantages Added Successfully",
      data: {
        id: newStrategyAdvantage.id,
        options: optionsData,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      mesage: "Something Went Wrong",
      error: error.message,
    });
  }
};
const GetAllData = async (req, res) => {
  try {
    const allData = await strategic.findAll({
      include: [
        {
          model: strategicoptions,
          as: "strategicoption",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Strategic Advantages Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.error("GetAllData Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const UpdateStrategicAdvantages = async (req, res) => {
  try {
    const { strategy_id } = req.params;
    const { description, option } = req.body;

    const options = Array.isArray(option) ? option : [option];

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    const strategyData = await strategic.findByPk(strategy_id);

    if (!strategyData) {
      return res.status(404).json({
        status: false,
        message: "Strategic advantage not found",
      });
    }

    await strategic.update(
      {
        description,
      },
      {
        where: {
          id: strategy_id,
        },
      },
    );

    if (options.length > 0 && options[0]) {
      await strategicoptions.destroy({
        where: {
          strategic_id: strategy_id,
        },
      });

      const optionsData = options
        .filter((item) => item && item.trim())
        .map((item) => ({
          strategic_id: strategy_id,
          option: item.trim(),
        }));

      if (optionsData.length > 0) {
        await strategicoptions.bulkCreate(optionsData);
      }
    }

    const updatedData = await strategic.findByPk(strategy_id, {
      include: [
        {
          model: strategicoptions,
          as: "strategicoption",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Strategic advantage updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("UpdateStrategicAdvantages Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const DeleteStrategicAdvantages = async (req, res) => {
  try {
    const { strategy_id } = req.params;

    const strategyData = await strategic.findByPk(strategy_id);

    if (!strategyData) {
      return res.status(404).json({
        status: false,
        message: "Strategic advantage not found",
      });
    }

    await strategicoptions.destroy({
      where: {
        strategic_id: strategy_id,
      },
    });

    await strategic.destroy({
      where: {
        id: strategy_id,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Strategic advantage and its options deleted successfully",
    });
  } catch (error) {
    console.error("DeleteStrategicAdvantages Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddStrategicAdvantages,
  GetAllData,
  UpdateStrategicAdvantages,
  DeleteStrategicAdvantages,
};
