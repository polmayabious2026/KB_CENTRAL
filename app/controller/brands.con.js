
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
const UpdateBrands = async (req, res) => {
  try {
    const { brand_id } = req.params;
    const { title } = req.body;

    const brandData = await brands.findByPk(brand_id);

    if (!brandData) {
      return res.status(404).json({
        status: false,
        message: "Brand Not Found",
      });
    }

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

    if (title) {
      brandData.title = title;
    }

    if (brandlogo_one) {
      brandData.brandlogo_one = brandlogo_one;
    }

    if (brandlogo_two) {
      brandData.brandlogo_two = brandlogo_two;
    }

    if (brandlogo_three) {
      brandData.brandlogo_three = brandlogo_three;
    }

    if (brandlogo_four) {
      brandData.brandlogo_four = brandlogo_four;
    }

    if (brandlogo_five) {
      brandData.brandlogo_five = brandlogo_five;
    }

    await brandData.save();

    return res.status(200).json({
      status: true,
      message: "Brand Updated Successfully",
      data: brandData,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const DeleteBrands = async (req, res) => {
  try {
    const { brand_id } = req.params;

    const brandData = await brands.findByPk(brand_id);

    if (!brandData) {
      return res.status(404).json({
        status: false,
        message: "Brand Not Found",
      });
    }

    await brandData.destroy();

    return res.status(200).json({
      status: true,
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddBrands,
  FindAllBrandsData,
  UpdateBrands,
  DeleteBrands,
};


