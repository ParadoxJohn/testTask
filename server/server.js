const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require('./models/Product');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення MongoDB
mongoose.connect("mongodb://localhost:27017/shop-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Отримання списку продуктів з сортуванням
app.get("/products", async (req, res) => {
  try {
    const { sortBy = 'name' } = req.query;
    const products = await Product.find().sort({ [sortBy]: 1, count: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Додавання нового продукту
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Оновлення продукту
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Видалення продукту
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Додавання коментаря до продукту
app.post("/products/:id/comments", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newComment = {
      ...req.body,
      productId: req.params.id, 
    };

    product.comments.push(newComment);
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(8000, () => {
  console.log("The server is running on port 8000");
});
