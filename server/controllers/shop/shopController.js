const Product = require("../../models/Products");

//! Get filtered and sorted products
const getFilteredProducts = async (req, res) => {
    try {
        const { category, brand, SortBy } = req.query;

        const query = {};

        if (category) {
            query.category = { $in: category.split(',') };
        }

        if (brand) {
            query.brand = { $in: brand.split(',') };
        }

        // apply sort
        let sort = {};

        switch (SortBy) {
            case "price-lowtohigh":
            case "price-low-high":
                sort.price = 1;
                break;

            case "price-hightolow":
            case "price-high-low":
                sort.price = -1;
                break;

            case "title-atoz":
                sort.title = 1;
                break;

            case "title-ztoa":
                sort.title = -1;
                break;

            case "newest":
                sort.createdAt = -1;
                break;

            case "oldest":
                sort.createdAt = 1;
                break;

            default:
                sort.price = 1;
        }

        const data = await Product.find(query).sort(sort);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



const getProductDetails = async (req, res) => {
    try {
        // receive product id
        const { id } = req.params;

        // find the product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });


    }catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}

module.exports = { getFilteredProducts , getProductDetails};
