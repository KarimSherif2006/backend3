const Cart = require('../models/cart.model');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.product',
      model: 'Product',
    });

    if (!cart) {
      // If no cart, create one for the user
      const newCart = await Cart.create({ user: req.user.id, items: [] });
      return res.json(newCart);
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    // If no cart, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart (by product, size, and color)
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      // If item exists, update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add new item
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();

    // Populate product details before sending response
    const populatedCart = await cart.populate({
      path: 'items.product',
      model: 'Product',
    });

    res.status(201).json(populatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
