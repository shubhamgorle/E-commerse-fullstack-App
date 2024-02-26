const Product = require("../models/productModels.js");



// create products - Admin

exports.createProduct = async (req, res, next) => {
    const products = await Product.create(req.body)
    res.status(201).json({
        success: true,
        products
    })
}


// get all products
exports.getAllProducts = async (req, res) => {
    const allproduct = await Product.find();
    res.status(200).json({
        success: true,
        allproduct
    })
}


// update product-Admin

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
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
}

// Delete 

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Is Successfully Deleted"
    })
}

//  Get product Details ---Single product 
exports.productDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
} 