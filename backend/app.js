const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const errorMiddleWare = require("./middleware/error.js")
app.use(express.json());
app.use(cookieparser())
// Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userroute.js");
const orderRoute = require("./routes/orderRoute.js")
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)

// MiddleWare for error
app.use(errorMiddleWare)

module.exports = app;
