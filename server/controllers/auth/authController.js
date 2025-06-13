//! Step-2, Create a authController.js to handle authentication logic

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//! Step-2-1, Register

const registerUser = async (req, res) => {
  //! Step-2-1-1, Destructure the request body to get userName, email, and password
  const { userName, email, password } = req.body;

  try {
    //! Step-2-1-2, Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    //! Step-2-1-3, Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //! Step-2-1-4, Create a new user instance
    const newUser = new User({
      userName,
      email,
      password: hashedPassword, //! Store the hashed password
    });

    //! Step-2-1-5, Save the user to the database
    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ success: false, message: "some error occurred" });
  }
};

//! Step-2-2, Login

const loginUser = async (req, res) => {
  //! Step-2-2-1, Destructure the request body to get email and password
  const { email, password } = req.body;

  try {
    //! Step-2-2-2, Check if the user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(200).json({
        success: false,
        message: "User does not exist with this email, please register",
      });
    }

    //! Step-2-2-3, Compare the password with the hashed password
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    //! Step-2-2-4, If the password does not match, return an error
    if (!checkPasswordMatch) {
      return res.status(200).json({
        success: false,
        message: "Invalid password, please try again",
      });
    }

    //! Step-2-2-5, Create a JWT token(if user is registered and password matches)
    const token = jwt.sign(
      {
        userId: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" } //! Token will expire in 1 day
    );

    //! Step-2-2-6, Set the token in the cookie
    res
      .cookie("token", token, {
        httpOnly: true, //! Cookie is not accessible via JavaScript
        secure: false,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: checkUser._id,
          email: checkUser.email,
          role: checkUser.role,
        },
      });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ success: false, message: "some error occurred" });
  }
};

//! Step-2-3, Logout

const logoutUser = async (req, res) => {
  //! Step-2-3, Clear the cookie
  res.clearCookie("token").json({
    success: true,
    message: "User logged out successfully",
  });
};

//! Step-2-4, Middleware

const authMiddleware = (req, res, next) => {
  //! Step-2-4-1, Get the token from the cookie
  const token = req.cookies.token;

  //! Step-2-4-2, If the token does not exist, return an error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, please login",
    });
  }
  try {
    //! Step-2-4-3, Verify the token
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    console.log("Decoded JWT →", decoded); // ✅ Add this to confirm
    req.user = decoded; //! Attach the user to the request object
    next(); //! Call the next middleware or route handler
  } catch (e) {
    console.error("Error during authentication:", e);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
