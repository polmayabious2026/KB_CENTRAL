const jwt = require("jsonwebtoken");
const admin = require("../model/admin.model");

const adminAuth = async (req, res, next) => {
  try {
    console.log("workin no 1")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token is required",
      });
    }

   
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    
    const findAdmin = await admin.findOne({
      where: {
        id: decoded.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!findAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }
    next();
}catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }}

  module.exports = {adminAuth}