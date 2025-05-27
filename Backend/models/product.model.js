const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  stock: { type: Number, default: 1 },
  image: { type: String, default: "https://via.placeholder.com/150" }
});

module.exports = mongoose.model('product', productSchema);