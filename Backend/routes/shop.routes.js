const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');
const auth = require('../middlewares/auth');

// Get all shops
router.get('/', async (req, res) => {
  try {
    const shops = await Shop.find().populate('shopkeeper', 'name email');
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single shop
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate('shopkeeper', 'name email')
      .populate('products');
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a shop (only for shopkeepers)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'shopkeeper') {
    return res.status(403).json({ message: 'Only shopkeepers can create shops' });
  }

  const shop = new Shop({
    ...req.body,
    shopkeeper: req.user.id
  });

  try {
    const newShop = await shop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;