const Product = require("../models/productModels.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apiFeatures.js");


// create products - Admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
     req.body.user = req.user.id;
 
    const products = await Product.create(req.body)
    res.status(201).json({
        success: true,
        products
    })
})


// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const allproduct = await apiFeatures.query;
    res.status(200).json({
        success: true,
        allproduct
    })
})


// update product-Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete 

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Is Successfully Deleted"
    })
})

//  Get product Details ---Single product 
exports.productDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        product,
        productCount
    })
})