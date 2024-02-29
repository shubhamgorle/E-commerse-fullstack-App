const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails } = require("../controllers/productController");
const {isAuthenticatedUser,authoriseRoles }= require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authoriseRoles("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser, authoriseRoles("admin"),updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser, authoriseRoles("admin"),deleteProduct);
router.route("/products/:id").get(productDetails);

module.exports = router;