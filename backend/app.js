const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json());

// cors roles
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const friendRoutes = require("./routes/friendRoutes");

mongoose
  .connect(config.uri)
  .then((res) => app.listen(config.serverPort))
  .catch((err) => console.log(err));

/* -------------------------------- */

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/friends", friendRoutes);
