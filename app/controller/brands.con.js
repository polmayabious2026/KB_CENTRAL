const { Op } = require("sequelize");

const brands = require("../model/brands");
const brandlogooption = require("../model/brandlogooption");

const AddBrands = async (req, res) => {
  try {
    const { title } = req.body;

    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);

    if (!title || !title.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }

    const brandImage = req.files?.image?.[0]?.filename;

    if (!brandImage) {
      return res.status(400).json({
        status: false,
        message: "Brand image is required",
      });
    }

    const logoFiles = req.files?.option_logo || [];

    if (logoFiles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one brand logo",
      });
    }

    const newBrand = await brands.create({
      title: title.trim(),
      image: brandImage,
    });

    const logoData = logoFiles.map((file) => ({
      brand_id: newBrand.id,
      option_logo: file.filename,
    }));

    await brandlogooption.bulkCreate(logoData);

    const brandWithLogos = await brands.findByPk(newBrand.id, {
      include: [
        {
          model: brandlogooption,
          as: "brandoption",
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
          as: "brandoption",
        },
      ],
      order: [["id", "DESC"]],
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

    const brandData = await brands.findByPk(brand_id);

    if (!brandData) {
      return res.status(404).json({
        status: false,
        message: "Brand Not Found",
      });
    }

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      updateData.title = title.trim();
    }

    const brandImage = req.files?.image?.[0]?.filename;

    if (brandImage) {
      updateData.image = brandImage;
    }

    if (Object.keys(updateData).length > 0) {
      await brandData.update(updateData);
    }

    const logoFiles = req.files?.logos || [];

    if (logoFiles.length > 0) {
      await brandlogooption.destroy({
        where: {
          brand_id: brand_id,
        },
      });

      const logoData = logoFiles.map((file) => ({
        brand_id: brand_id,
        option_logo: file.filename,
      }));

      await brandlogooption.bulkCreate(logoData);
    }

    const updatedBrand = await brands.findByPk(brand_id, {
      include: [
        {
          model: brandlogooption,
          as: "brandoption",
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
