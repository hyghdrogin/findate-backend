const multer = require("multer");
const { v2 } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../database/config/index");

v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: v2,
  folder: "uploads",
  allowedFormats: ["jpg", "png", "pdf"],
  quality_analysis: true,
  transformation: [{
    width: "315", crop: "fill", gravity: "faces", radius: 50, effect: "saturation:50", height: "250"
  }]
});
const parser = multer({ storage });

module.exports = parser;
