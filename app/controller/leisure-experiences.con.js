
const leisureexperiences = require("../model/leisure-experiences")

const Addleisure = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const {
            option_title_one, 
            option_title_two,
            option_title_three,
            option_title_four} = req.body;
        if(!req.body){
            return res.status(400).json({
                status: false,
                message: "Please Provide All Titles"
            });
        }

        const option_image_one =
            req.files?.option_image_one?.[0]?.filename;

        const option_image_two =
            req.files?.option_image_two?.[0]?.filename;

        const option_image_three =
            req.files?.option_image_three?.[0]?.filename;

        const option_image_four =
            req.files?.option_image_four?.[0]?.filename;

        if (
            !option_image_one ||
            !option_image_two ||
            !option_image_three ||
            !option_image_four 
        ) {
            return res.status(400).json({
                status: false,
                message: "Please upload all 5 Option Images"
            });
        }

        const newBrand = await leisureexperiences.create({
            
            option_title_one, 
            option_title_two,
            option_title_three,
            option_title_four,
            option_image_one,
            option_image_two,
            option_image_three,
            option_image_four

        });

        return res.status(201).json({
            status: true,
            message: "Leisre Detils added successfully",
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
const FindAllLeisureData = async (req, res) => {
  try {
    const allData = await leisureexperiences.findAll();
    return res.status(200).json({
      status: true,
      message: "All Leisure Details Fetched Successfully",
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
const UpdateLeisure = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);

    const { leisure_id } = req.params;

    const {
      option_title_one,
      option_title_two,
      option_title_three,
      option_title_four,
    } = req.body;

    const leisureData = await leisureexperiences.findByPk(leisure_id);

    if (!leisureData) {
      return res.status(404).json({
        status: false,
        message: "Leisure Details Not Found",
      });
    }

    const option_image_one =
      req.files?.option_image_one?.[0]?.filename;

    const option_image_two =
      req.files?.option_image_two?.[0]?.filename;

    const option_image_three =
      req.files?.option_image_three?.[0]?.filename;

    const option_image_four =
      req.files?.option_image_four?.[0]?.filename;

    // if (bold_title) {
    //   leisureData.bold_title = bold_title;
    // }

    if (option_title_one) {
      leisureData.option_title_one = option_title_one;
    }

    if (option_title_two) {
      leisureData.option_title_two = option_title_two;
    }

    if (option_title_three) {
      leisureData.option_title_three = option_title_three;
    }

    if (option_title_four) {
      leisureData.option_title_four = option_title_four;
    }

    if (option_image_one) {
      leisureData.option_image_one = option_image_one;
    }

    if (option_image_two) {
      leisureData.option_image_two = option_image_two;
    }

    if (option_image_three) {
      leisureData.option_image_three = option_image_three;
    }

    if (option_image_four) {
      leisureData.option_image_four = option_image_four;
    }

    await leisureData.save();

    return res.status(200).json({
      status: true,
      message: "Leisure Details Updated Successfully",
      data: leisureData,
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


const DeleteLeisure = async (req, res) => {
  try {
    const { leisure_id } = req.params;

    const leisureData = await leisureexperiences.findByPk(leisure_id);

    if (!leisureData) {
      return res.status(404).json({
        status: false,
        message: "Leisure Details Not Found",
      });
    }

    await leisureData.destroy();

    return res.status(200).json({
      status: true,
      message: "Leisure Details Deleted Successfully",
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
  Addleisure,
  FindAllLeisureData,
  UpdateLeisure,
  DeleteLeisure
};




