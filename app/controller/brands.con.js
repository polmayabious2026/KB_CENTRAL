const brands = require("../model/brands");
const brandlogooption = require("../model/brandlogooption");


const AddBrands = async (req, res) => {
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

    const logos = [
      brandlogo_one,
      brandlogo_two,
      brandlogo_three,
      brandlogo_four,
      brandlogo_five,
    ].filter(Boolean);

    if (logos.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one brand logo",
      });
    }

    // Create brand
    const newBrand = await brands.create({
      title: title.trim(),
    });

  
    const logoData = logos.map((logo) => ({
      brand_id: newBrand.id,
      option_logo: logo,
    }));

    await brandlogooption.bulkCreate(logoData);

   
    const brandWithLogos = await brands.findByPk(newBrand.id, {
      include: [
        {
          model: brandlogooption,
          as: "brandlogos",
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "Brand Added Successfully",
      data: brandWithLogos,
    });

  } catch (error) {
    console.error("AddBrands Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};



const FindAllBrandsData = async (req, res) => {
  try {
    const allData = await brands.findAll({
      include: [
        {
          model: brandlogooption,
          as: "brandlogos",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All Brands Details Fetched Successfully",
      data: allData,
    });

  } catch (error) {
    console.error("FindAllBrandsData Error:", error);

    return res.status(500).json({
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

    // Find brand
    const brandData = await brands.findByPk(brand_id);

    if (!brandData) {
      return res.status(404).json({
        status: false,
        message: "Brand Not Found",
      });
    }

    if (title && title.trim()) {
      brandData.title = title.trim();
    }

    await brandData.save();

  
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

    const newLogos = [
      brandlogo_one,
      brandlogo_two,
      brandlogo_three,
      brandlogo_four,
      brandlogo_five,
    ].filter(Boolean);

   
    if (newLogos.length > 0) {

      await brandlogooption.destroy({
        where: {
          brand_id: brand_id,
        },
      });

      const logoData = newLogos.map((logo) => ({
        brand_id: brand_id,
        option_logo: logo,
      }));

      await brandlogooption.bulkCreate(logoData);
    }

    
    const updatedBrand = await brands.findByPk(brand_id, {
      include: [
        {
          model: brandlogooption,
          as: "brandlogos",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Brand Updated Successfully",
      data: updatedBrand,
    });

  } catch (error) {
    console.error("UpdateBrands Error:", error);

    return res.status(500).json({
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

  
    await brandlogooption.destroy({
      where: {
        brand_id: brand_id,
      },
    });

  
    await brandData.destroy();

    return res.status(200).json({
      status: true,
      message: "Brand Deleted Successfully",
    });

  } catch (error) {
    console.error("DeleteBrands Error:", error);

    return res.status(500).json({
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
