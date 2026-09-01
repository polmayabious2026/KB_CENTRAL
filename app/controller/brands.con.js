
const brands = require("../model/brands")

const AddBrands = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { title } = req.body;

        const brandlogo_one =
            req.files?.brandlogo_one?.[0]?.filename;

        const brandlogo_two =
            req.files?.brandlogo_two?.[0]?.filename;

        const brandlogo_three =
            req.files?.brandlogo_three?.[0]?.filename;

        const brandlogo_four =
            req.files?.brandlogo_four?.[0]?.filename;

        const brandlogo_five =
            req.files?.brandlogo_five?.[0]?.filename;

        if (
            !brandlogo_one ||
            !brandlogo_two ||
            !brandlogo_three ||
            !brandlogo_four ||
            !brandlogo_five
        ) {
            return res.status(400).json({
                status: false,
                message: "Please upload all 5 brand logos"
            });
        }

        const newBrand = await brands.create({
            title,
            brandlogo_one,
            brandlogo_two,
            brandlogo_three,
            brandlogo_four,
            brandlogo_five
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
const FindAllBrandsData = async (req, res) => {
  try {
    const allData = await brands.findAll();
    return res.status(200).json({
      status: true,
      message: "All Brands Details Fetched Successfully",
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












module.exports = {AddBrands,FindAllBrandsData}