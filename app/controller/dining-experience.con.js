
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












module.exports = {AddDiningExperiences,AllDiningExperienceData}