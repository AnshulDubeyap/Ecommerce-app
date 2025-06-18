const express = require("express");

const router = express.Router();

const { upload } = require("../../helpers/cloudinary");

const {
  handelImageUpload,
} = require("../../controllers/admin/products.controller");

router.post("/upload-image", upload.single("my_file"), handelImageUpload);

module.exports = router;
