const express = require("express");
const {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem,
} = require("../../controllers/shop/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems); // ← fixed colon
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
