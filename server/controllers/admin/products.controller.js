const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Products");

//! Step-1, Create a controller function for the saving of image in cloudinary
const handelImageUpload = async (req, res) => {
  try {
    //! Step-1-1, Convert the image coming from client into base64 url
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    //! Step-1-2, get the url and hit the image upload function
    const result = await imageUploadUtil(url);

    //! Step-1-3, Send the response when successful
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

//! Step-2, Controller for Creating a new product
const addProduct = async (req, res) => {
  try {
    //! Step-2-1, Destructure the request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    //! Step-2-2, Create a new product
    const newlyCreatedProduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    //! Step-2-3, Save the product
    await newlyCreatedProduct.save();

    //! Step-2-4, Send the response
    res.json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//! Step-3, Controller for Updating a product
const editProduct = async (req, res) => {
  try {
    //! Step-3-1, Get product id from params
    const { id } = req.params;

    //! Step-3-2, Destructure the request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    //! Step-3-3, Find the product by id
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //! Step-3-4, Update product fields
    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    //! Step-3-5, Save the updated product
    await findProduct.save();

    //! Step-3-6, Send response
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//! Step-4, Controller for Deleting a product
const deleteProduct = async (req, res) => {
  try {
    //! Get the id of the product
    const { id } = req.params;

    //! Delete the product
    await Product.findByIdAndDelete(id);

    //! Send the response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//! Step-5, Controller for Fetching all products
const fetchAllProducts = async (req, res) => {
  try {
    //! Step-5-1, Fetch all products from DB
    const listOfProducts = await Product.find({});

    //! Step-5-2, Send the response
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handelImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
};
