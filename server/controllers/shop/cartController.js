const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

//! Add item to cart
const addToCart = async (req, res) => {
    try {
        // get the user id, product id and quantity
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find the product based on id
        const product = await Product.findById(productId);

        // check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // find the user cart
        let cart = await Cart.findOne({ userId });

        // check if cart exists
        if (!cart) {
            // create a new cart
            cart = new Cart({ userId, items: [] });
        }

        // find current product index
        const currentProductIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        // check if product already exists in cart
        if (currentProductIndex !== -1) {
            // update the quantity
            cart.items[currentProductIndex].quantity += Number(quantity);
        } else {
            // add the product to the cart
            cart.items.push({ productId, quantity: Number(quantity) });
        }

        // save the cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: cart,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

//! Fetch items in cart
const fetchCartItems = async (req, res) => {
    try {
        // get the user id
        const { userId } = req.params;

        // check if user id is provided
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required",
            });
        }

        // find the user cart
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        // if cart does not exist
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // check for valid cart items
        const validCartItems = cart.items.filter(item => item.productId);

        if (validCartItems.length < cart.items.length) {
            cart.items = validCartItems;
            await cart.save();
        }

        // populate the cart items
        const populatedCartItems = validCartItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image || null,
            title: item.productId.title || null,
            price: item.productId.price || null,
            salePrice: item.productId.salePrice || null,
            quantity: item.quantity || null,
        }));

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: { ...cart._doc, items: populatedCartItems },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

//! Update quantity of a cart item
const updateCartItemQty = async (req, res) => {
    try {
        // get the user id, product id and quantity
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find the user cart
        const cart = await Cart.findOne({ userId });

        // check if cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        cart.items[findCurrentProductIndex].quantity = Number(quantity);

        await cart.save();

        // populate the cart items
        await cart.populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId?._id || null,
            image: item.productId?.image || null,
            title: item.productId?.title || null,
            price: item.productId?.price || null,
            salePrice: item.productId?.salePrice || null,
            quantity: item.quantity || null,
        }));

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: { ...cart._doc, items: populatedCartItems },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

//! Delete item from cart
const deleteCartItem = async (req, res) => {
    try {
        // get the user id and product id
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find the user cart
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        // check if cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId?._id || null,
            image: item.productId?.image || null,
            title: item.productId?.title || null,
            price: item.productId?.price || null,
            salePrice: item.productId?.salePrice || null,
            quantity: item.quantity || null,
        }));

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: { ...cart._doc, items: populatedCartItems },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem,
};
