const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const errorMiddleWare = require("./middleware/error.js")
 
dotenv.config({path:"backend/config/config.env"});

// middlewares
app.use(express.json());
app.use(cookieparser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

// Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userroute.js");
const orderRoute = require("./routes/orderRoute.js")
const paymentRoute = require("./routes/paymentRoute.js")
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)
app.use("/api/v1", paymentRoute)

// MiddleWare for error
app.use(errorMiddleWare)

module.exports = app;
