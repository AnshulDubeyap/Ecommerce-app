const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const adminProductsRouter = require("./routes/admin/products-routes");

//! Step-3-4, Configure the routes for authentication
const authRoute = require("./routes/auth/authRoute");

//! Create a Database Connection
mongoose
  .connect(
    "mongodb+srv://dubeyanshul2204:KylGPOyqHd3zN9kx@cluster0.ng0yraz.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//! Create a App
const app = express();
const PORT = process.env.PORT || 5000;

//! Configure the cors
//? Hey server, allow requests from my frontend app running at localhost:5173. Let it send or receive data, including login info, and allow specific request types and headers

//? app.use is simply app uses
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "content-type",
      "Authorization",
      "Cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute); //! Step-3-5, Use the authRoute

app.use("/api/admin/products", adminProductsRouter);
//! Run the Server
app.listen(PORT, () => {
  console.log(`Server is now running in port ${PORT}`);
});
