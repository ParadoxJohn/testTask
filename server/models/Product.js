const mongoose = require('mongoose');

// Схема для коментарів до продукту
const commentSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  description: String,
  date: String
});

// Схема для продуктів
const productSchema = new mongoose.Schema({
  name: String,
  count: Number,
  size: {
    width: Number,
    height: Number,
  },
  weight: String,
  comments: [commentSchema]
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
