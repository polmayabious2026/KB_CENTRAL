
const diningexperiences = require("../model/dining-experiences")

const AddDiningExperiences = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { title } = req.body;

        const dining_photo =
            req.files?.dining_photo?.[0]?.filename;

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
        const brandlogo_six =
            req.files?.brandlogo_six?.[0]?.filename;
        const brandlogo_seven =
            req.files?.brandlogo_seven?.[0]?.filename;
        const brandlogo_eight =
            req.files?.brandlogo_eight?.[0]?.filename;
        const brandlogo_nine =
            req.files?.brandlogo_nine?.[0]?.filename;
        const brandlogo_ten =
            req.files?.brandlogo_ten?.[0]?.filename;
        const brandlogo_evelen =
            req.files?.brandlogo_eleven?.[0]?.filename;

        if (
            !brandlogo_one ||
            !brandlogo_two ||
            !brandlogo_three ||
            !brandlogo_four ||
            !brandlogo_five ||!
            brandlogo_six||!
            brandlogo_seven||!
            brandlogo_eight ||!
            brandlogo_nine||
            !brandlogo_ten ||
            !brandlogo_evelen ||!dining_photo
        ) {
            return res.status(400).json({
                status: false,
                message: "Please upload all 11 brand logos"
            });
        }

        const newBrand = await diningexperiences.create({
            title,
            dining_photo,
            brandlogo_one,
            brandlogo_two,
            brandlogo_three,
            brandlogo_four,
            brandlogo_five,
            brandlogo_six,
            brandlogo_seven,
            brandlogo_eight,
            brandlogo_nine,
            brandlogo_ten,
            brandlogo_eleven,
        });

        return res.status(201).json({
            status: true,
            message: "Brand added successfully into Dining Experiences",
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
const AllDiningExperienceData = async (req, res) => {
  try {
    const allData = await diningexperiences.findAll();
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
const UpdateDiningExperiences = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { dining_id } = req.params;
    const { title } = req.body;

    const diningData = await diningexperiences.findByPk(dining_id);

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }

    const dining_photo =
      req.files?.dining_photo?.[0]?.filename;

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

    const brandlogo_six =
      req.files?.brandlogo_six?.[0]?.filename;

    const brandlogo_seven =
      req.files?.brandlogo_seven?.[0]?.filename;

    const brandlogo_eight =
      req.files?.brandlogo_eight?.[0]?.filename;

    const brandlogo_nine =
      req.files?.brandlogo_nine?.[0]?.filename;

    const brandlogo_ten =
      req.files?.brandlogo_ten?.[0]?.filename;

    const brandlogo_eleven =
      req.files?.brandlogo_eleven?.[0]?.filename;

    if (title) {
      diningData.title = title;
    }

    if (dining_photo) {
      diningData.dining_photo = dining_photo;
    }

    if (brandlogo_one) {
      diningData.brandlogo_one = brandlogo_one;
    }

    if (brandlogo_two) {
      diningData.brandlogo_two = brandlogo_two;
    }

    if (brandlogo_three) {
      diningData.brandlogo_three = brandlogo_three;
    }

    if (brandlogo_four) {
      diningData.brandlogo_four = brandlogo_four;
    }

    if (brandlogo_five) {
      diningData.brandlogo_five = brandlogo_five;
    }

    if (brandlogo_six) {
      diningData.brandlogo_six = brandlogo_six;
    }

    if (brandlogo_seven) {
      diningData.brandlogo_seven = brandlogo_seven;
    }

    if (brandlogo_eight) {
      diningData.brandlogo_eight = brandlogo_eight;
    }

    if (brandlogo_nine) {
      diningData.brandlogo_nine = brandlogo_nine;
    }

    if (brandlogo_ten) {
      diningData.brandlogo_ten = brandlogo_ten;
    }

    if (brandlogo_eleven) {
      diningData.brandlogo_eleven = brandlogo_eleven;
    }

    await diningData.save();

    return res.status(200).json({
      status: true,
      message: "Dining Experience Updated Successfully",
      data: diningData,
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


const DeleteDiningExperiences = async (req, res) => {
  try {
    const { dining_id } = req.params;

    const diningData = await diningexperiences.findByPk(dining_id);

    if (!diningData) {
      return res.status(404).json({
        status: false,
        message: "Dining Experience Not Found",
      });
    }

    await diningData.destroy();

    return res.status(200).json({
      status: true,
      message: "Dining Experience Deleted Successfully",
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
  AddDiningExperiences,
  AllDiningExperienceData,
  UpdateDiningExperiences,
  DeleteDiningExperiences
};


