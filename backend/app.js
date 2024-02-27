const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error.js")
app.use(express.json());

// Route Import
const product = require("./routes/productRoute")
app.use("/api/v1", product)

// MiddleWare for error
app.use(errorMiddleWare)

module.exports = app;
