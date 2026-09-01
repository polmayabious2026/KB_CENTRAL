
const floorplans = require("../model/floor-plans")

const AddFloorPlans = async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        // const { title } = req.body;

        const floorimage_one =
            req.files?.floorimage_one?.[0]?.filename;

        const floorimage_two =
            req.files?.floorimage_two?.[0]?.filename;

        const floorimage_three =
            req.files?.floorimage_three?.[0]?.filename;

        const floorimage_four =
            req.files?.floorimage_four?.[0]?.filename;

        const floorimage_five =
            req.files?.floorimage_five?.[0]?.filename;

        if (
            !floorimage_one ||
            !floorimage_two ||
            !floorimage_three ||
            !floorimage_four ||
            !floorimage_five
        ) {
            return res.status(400).json({
                status: false,
                message: "Please upload all 5 Floor Images"
            });
        }

        const newBrand = await floorplans.create({
            floorimage_one,
            floorimage_two,
            floorimage_three,
            floorimage_four,
            floorimage_five
        });

        return res.status(201).json({
            status: true,
            message: "Brand added successfully",
            data: newBrand
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: false,
            message: "Something Went Wrong",
            error: error.message
        });
    }
};
const FindAllFloorData = async (req, res) => {
  try {
    const allData = await floorplans.findAll();
    return res.status(200).json({
      status: true,
      message: "All FloorPlans Details Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};












module.exports = {AddFloorPlans,FindAllFloorData}