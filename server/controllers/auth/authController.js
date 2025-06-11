//! Step-2, Create a authController.js to handle authentication logic

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//! Step-2-1, Register

const registerUser = async (req, res) => {
  //! Step-2-1-1, Destructure the request body to get userName, email, and password
  const { userName, email, password } = req.body;

  console.log("➡️ Incoming register request body:", req.body); //?

  try {
    //! Step-2-1-2, Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //! Step-2-1-3, Create a new user instance
    const newUser = new User({
      userName,
      email,
      password: hashedPassword, //! Store the hashed password
    });

    //! Step-2-1-4, Save the user to the database
    const savedUser = await newUser.save();
    console.log("✅ User saved to DB:", savedUser); //?

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ success: false, message: "some error occurred" });
  }
};

//! Step-2-2, Login

const login = async (req, res) => {
  //! Step-2-2-1, Destructure the request body to get email and password
  const { email, password } = req.body;

  try {
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ success: false, message: "some error occurred" });
  }
};

module.exports = {
  registerUser,
};
