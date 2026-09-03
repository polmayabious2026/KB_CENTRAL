const admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const AddAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Provide all details",
      });
    }


    const existingAdmin = await admin.findOne({
      where: {
        email: email,
      },
    });

    if (existingAdmin) {
      return res.status(409).json({
        status: false,
        message: "Admin already exists",
      });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const createAdmin = await admin.create({
      email: email,
      password: hashedPassword,
    });

    const adminData = createAdmin.toJSON();
    delete adminData.password;

    return res.status(201).json({
      status: true,
      message: "Admin created successfully",
      data: adminData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Provide all details",
      });
    }

   
    const findAdmin = await admin.findOne({
      where: {
        email: email,
      },
    });

    if (!findAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

   
    const checkPass = await bcrypt.compare(
      password,
      findAdmin.password
    );

    if (!checkPass) {
      return res.status(401).json({
        status: false,
        message: "Wrong password",
      });
    }

 
    const token = jwt.sign(
      {
        id: findAdmin.id,
        email: findAdmin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

   
    const adminData = findAdmin.toJSON();
    delete adminData.password;

    return res.status(200).json({
      status: true,
      message: "Admin login successfully",
      token: token,
      data: adminData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const LogOut = async (req, res) => {
  try {
   
    return res.status(200).json({
      status: true,
      message: "Admin logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddAdmin,
  LogIn,
  LogOut,
};