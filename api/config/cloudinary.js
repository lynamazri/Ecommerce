const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");
dotenv.config();
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: "dwixiglzx",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  //secure: true
});
