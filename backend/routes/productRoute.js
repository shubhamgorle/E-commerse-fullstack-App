const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails, createProductReview, getProductReviews, deleteProductReview } = require("../controllers/productController");
const {isAuthenticatedUser,authoriseRoles }= require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, authoriseRoles("admin"), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, authoriseRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authoriseRoles("admin"),deleteProduct);
router.route("/products/:id").get(productDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser,deleteProductReview);
module.exports = router;