const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });
};

module.exports = connectCloudinary;
