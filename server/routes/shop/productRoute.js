const express = require("express");
const router = express.Router();


const { getFilteredProducts } = require("../../controllers/shop/shopController");

router.get("/get", getFilteredProducts);

module.exports = router;