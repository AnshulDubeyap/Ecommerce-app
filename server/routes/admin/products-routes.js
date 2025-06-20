const express = require("express");

const router = express.Router();

const { upload } = require("../../helpers/cloudinary");

const {
  handelImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../../controllers/admin/products.controller");

router.post("/upload-image", upload.single("my_file"), handelImageUpload);

router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;
