//! Step-3, Create a route for authentication

const express = require("express");
const {
  registerUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/authController");
const { loginUser } = require("../../controllers/auth/authController");

//! Step-3-1, Create a router instance
const router = express.Router();

//! Step-3-2-1, Create a route for registration
router.post("/register", registerUser);

//! Step-3-2-2, Create a route for login
router.post("/login", loginUser);

//! Step-3-2-3, Create a route for logout (optional, if needed)
router.post("/logout", logoutUser);

//! Step-3-2-3, Create a route for middleware
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: {
      userName: user.userName,
      email: user.email,
      _id: user._id,
    },
  });
});
//! Step-3-3, Export the router
module.exports = router;
