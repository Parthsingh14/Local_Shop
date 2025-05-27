const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const auth = require('../middlewares/auth');

// Get all products (for customers)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add product (for shopkeepers)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'shopkeeper') return res.status(403).json({ error: "Not authorized" });
  
  const product = new Product({ ...req.body, shopkeeper: req.user._id });
  await product.save();
  res.json(product);
});

module.exports = router;