const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', orderSchema);