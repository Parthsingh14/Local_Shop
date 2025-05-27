const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const auth = require('../middlewares/auth');

// Place order (for customers)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'customer') return res.status(403).json({ error: "Not authorized" });

  const { products } = req.body;
  let total = 0;

  // Calculate total
  for (const item of products) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }

  const order = new Order({ customer: req.user._id, products, totalAmount: total });
  await order.save();
  res.json(order);
});

module.exports = router;