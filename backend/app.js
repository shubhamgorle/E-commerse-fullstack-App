const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error.js")
app.use(express.json());

// Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userroute.js")
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)

// MiddleWare for error
app.use(errorMiddleWare)

module.exports = app;
