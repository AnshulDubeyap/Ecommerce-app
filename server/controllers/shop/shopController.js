const Product = require("../../models/Products");

const getFilteredProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }

};

module.exports = { getFilteredProducts };