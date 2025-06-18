const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dceoovviz",
  api_key: "299874342146476",
  api_secret: "1voTGthgdSWMU2YErvsxRNpN3Vo",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
