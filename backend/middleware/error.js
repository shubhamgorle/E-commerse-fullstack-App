const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong mongoDb Id error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}
