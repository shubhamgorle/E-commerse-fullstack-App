const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails } = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(productDetails);

module.exports = router;