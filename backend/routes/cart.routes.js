const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, cartController.getCart);

// @route   POST /cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, cartController.addToCart);

module.exports = router;
