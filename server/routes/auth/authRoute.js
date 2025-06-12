//! Step-3, Create a route for authentication

const express = require("express");
const { registerUser } = require("../../controllers/auth/authController");
const { loginUser } = require("../../controllers/auth/authController");

//! Step-3-1, Create a router instance
const router = express.Router();

//! Step-3-2-1, Create a route for registration
router.post("/register", registerUser);

//! Step-3-2-2, Create a route for login
router.post("/login", loginUser);

//! Step-3-3, Export the router
module.exports = router;
