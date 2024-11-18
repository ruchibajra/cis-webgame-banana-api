const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.port || 8000;

connectDB();
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
