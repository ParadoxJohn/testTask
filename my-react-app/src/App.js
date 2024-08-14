import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import ProductView from './components/ProductView';

const App = () => {
  const [products, setProducts] = useState([]); // Стан для зберігання списку продуктів
  const [selectedProduct, setSelectedProduct] = useState(null); // Стан для зберігання вибраного продукту
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для контролю відкриття модального вікна
  const [isViewing, setIsViewing] = useState(false); // Стан для контролю перегляду продукту
  const [sortBy, setSortBy] = useState('name'); // Стан для вибору критерію сортування продуктів

  // Функція для отримання списку продуктів з сервера
  const fetchProducts = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/products?sortBy=${sortBy}`);
    const data = await response.json();
    setProducts(data);
  }, [sortBy]);

  // Виклик функції fetchProducts при зміні сортування або при першому рендерингу
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Функція для відкриття модального вікна для додавання продукту
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
    setIsViewing(false);
  };

  // Функція для відкриття модального вікна для редагування продукту
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsViewing(false);
  };

  // Функція для відкриття перегляду продукту
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewing(true);
    setIsModalOpen(false);
  };

  // Функція для збереження нового або відредагованого продукту
  const handleSaveProduct = async (productData) => {
    const method = selectedProduct ? 'PUT' : 'POST'; // Визначаємо метод в залежності від того, чи редагуємо ми продукт
    const url = selectedProduct
      ? `http://localhost:8000/products/${selectedProduct._id}`
      : 'http://localhost:8000/products';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    setIsModalOpen(false);
    fetchProducts(); // Оновлюємо список продуктів
  };

  // Функція для видалення продукту
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      await fetch(`http://localhost:8000/products/${productId}`, { method: 'DELETE' });
      fetchProducts(); // Оновлюємо список продуктів
    }
  };

  return (
    <div>
      {/* Кнопка для додавання нового продукту */}
      <button onClick={handleAddProduct}>Add a product</button>
      {/* Вибір критерію сортування */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">By name</option>
        <option value="count">By quantity</option>
      </select>
      {/* Список продуктів з можливістю редагування, видалення та перегляду */}
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onView={handleViewProduct}
      />
      {/* Модальне вікно для створення або редагування продукту */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {/* Модальне вікно для перегляду продукту */}
      {isViewing && (
        <ProductView
          product={selectedProduct}
          onClose={() => setIsViewing(false)}
        />
      )}
    </div>
  );
};

export default App;
