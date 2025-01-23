const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoutes);

// CORS setup (Allow all origins for now, or dynamically manage it)
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));

// Connect to MongoDB

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB", error);
	});

// Remove app.listen() as Vercel handles port automatically

app.listen(process.env.PORT, () => {});

module.exports = app;
