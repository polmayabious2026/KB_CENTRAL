const strategic = require("../model/strategic-advantages");

const AddStrategicAdvantages = async (req, res) => {
  try {
//     console.log("==========================");
//  console.log("Request Body:", req.body);
//  console.log("==========================");
    const { description,
      advantages_one,
      advantages_two,
      advantages_three,
      advantages_four,
      advantages_five,
      advantages_six } = req.body;

      console.log("Request Body:", req.body); // Log the request body for debugging
      
    if (!description || !advantages_one || !advantages_two || !advantages_three ||!advantages_four||!advantages_five||!advantages_six ) {
      return res.status(400).json({
        status: false,
        message: "Provide Description or Advantages",
      });
    }

    const newData = await strategic.create({
      description:description,
      advantages_one: advantages_one,
      advantages_two: advantages_two,
      advantages_three: advantages_three,
      advantages_four: advantages_four,
      advantages_five: advantages_five,
      advantages_six: advantages_six,
    });

    return res.status(201).json({
        status:true,
        message:"Description With Advantages Added Successfully",
        data:newData,
    })
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
    const allData = await strategic.findAll();
    return res.status(200).json({
      status: true,
      message: "Description With Advantages Added Successfully",
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      mesage: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateStrategicAdvantages = async (req, res) => {
  try {
    const { strategy_id } = req.params;
    const {
      description,
      advantages_one,
      advantages_two,
      advantages_three,
      advantages_four,
      advantages_five,
      advantages_six,
    } = req.body;

    const [updatedRows] = await strategic.update(
      {
        description,
        advantages_one,
        advantages_two,
        advantages_three,
        advantages_four,
        advantages_five,
        advantages_six,
      },
      {
        where: {
          id: strategy_id,
        },
      },
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Strategic advantage not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Strategic advantage updated successfully",
      
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      mesage: "Something Went Wrong",
      error: error.message,
    });
  }
};
const DeleteStrategicAdvantages = async (req, res) => {
  try {
    const { strategy_id } = req.params;

    const deletedRows = await strategic.destroy({
      where: {
        id: strategy_id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Strategic advantage not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Strategic advantage deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      mesage: "Something Went Wrong",
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
