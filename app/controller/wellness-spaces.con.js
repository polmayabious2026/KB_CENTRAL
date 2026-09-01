const wellnessspaces = require("../model/wellness-spaces");

const AddWellnessSpaces = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title } = req.body;

    const wellness_background_photo =
      req.files?.wellness_background_photo?.[0]?.filename;

    const brandlogo_one = req.files?.brandlogo_one?.[0]?.filename;
    const brandlogo_two = req.files?.brandlogo_two?.[0]?.filename;
    const brandlogo_three = req.files?.brandlogo_three?.[0]?.filename;
    const brandlogo_four = req.files?.brandlogo_four?.[0]?.filename;
    const brandlogo_five = req.files?.brandlogo_five?.[0]?.filename;
    const brandlogo_six = req.files?.brandlogo_six?.[0]?.filename;
    const brandlogo_seven = req.files?.brandlogo_seven?.[0]?.filename;
    const brandlogo_eight = req.files?.brandlogo_eight?.[0]?.filename;

    if (
      !brandlogo_one ||
      !brandlogo_two ||
      !brandlogo_three ||
      !brandlogo_four ||
      !brandlogo_five ||
      !brandlogo_six ||
      !brandlogo_seven ||
      !brandlogo_eight ||
      !wellness_background_photo
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Please upload all 8 brand logos and Wellness Background Image",
      });
    }

    const newBrand = await wellnessspaces.create({
      title,
      wellness_background_photo,
      brandlogo_one,
      brandlogo_two,
      brandlogo_three,
      brandlogo_four,
      brandlogo_five,
      brandlogo_six,
      brandlogo_seven,
      brandlogo_eight,
    });

    return res.status(201).json({
      status: true,
      message: "Brand added successfully into wellness Spaces",
      data: newBrand,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const AllWellnessData = async (req, res) => {
  try {
    const allData = await wellnessspaces.findAll();
    return res.status(200).json({
      status: true,
      message: "All DiningExperience Details Fetched Successfully",
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

module.exports = { AddDiningExperiences, AllDiningExperienceData };
