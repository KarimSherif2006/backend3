const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.post("/", protect, adminOnly, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", protect, adminOnly, productController.updateProduct);
router.delete("/:id", protect, adminOnly, productController.deleteProduct);

module.exports = router;
