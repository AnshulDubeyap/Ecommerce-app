//! Step-1, Create a model Products.js

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
