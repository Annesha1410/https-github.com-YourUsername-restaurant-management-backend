

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

console.log("JWT SECRET  EXISTS:", !!process.env.JWT_SECRET_KEY);

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth-routes");
const menuRoutes = require("./src/routes/menu-routes");
const userRoutes = require("./src/routes/user-routes");

const app = express();

connectDB();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Restaurant Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/menu-items", menuRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
