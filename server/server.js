const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const adminProductsRouter = require("./routes/admin/products-routes");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/shop/productRoute");

mongoose
    .connect(
        "mongodb+srv://dubeyanshul2204:KylGPOyqHd3zN9kx@cluster0.ng0yraz.mongodb.net/myDatabase?retryWrites=true&w=majority" // Added database name
    )
    .then(() => console.log("MongoDB is Connected"))
    .catch((error) => console.log("MongoDB error:", error));

const app = express();
const PORT = process.env.PORT || 5000;

// Define /test route first
app.get("/test", (req, res) => {
    console.log("Test route hit at", new Date().toISOString());
    res.json({ message: "Server is alive" });
});

// Log all requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url} at ${new Date().toISOString()}`, req.body);
    next();
});

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
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", productRoute);

app.listen(PORT, () => {
    console.log(`Server is now running in port ${PORT} at ${new Date().toISOString()}`);
});