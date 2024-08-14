import React, { useState, useEffect } from 'react';
import { styles } from '../styles/style';

const ProductModal = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    count: 0,
    imageUrl: '',
    size: { width: 0, height: 0 },
    weight: '',
  });
  const [errors, setErrors] = useState({});

  // Якщо продукт переданий в пропсах, заповнюємо форму його даними
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  // Обробник зміни даних у формі
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'width' || name === 'height') {
      // Оновлюємо розмір продукту
      setFormData(prevData => ({
        ...prevData,
        size: { ...prevData.size, [name]: Number(value) }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Функція для перевірки форми на валідність
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Title is required";
    if (formData.count <= 0) errors.count = "The number must be more than 0";
    if (!formData.imageUrl.trim()) errors.imageUrl = "Image URL is required";
    if (formData.size.width <= 0) errors.width = "The width must be greater than 0";
    if (formData.size.height <= 0) errors.height = "The height must be greater than 0";
    if (!formData.weight.trim()) errors.weight = "Weight is required";
    return errors;
  };

  // Обробка подання форми
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    // Якщо форма валідна, зберігаємо продукт
    if (Object.keys(formErrors).length === 0) {
      onSave(formData);
    } else {
      // Якщо є помилки, показуємо їх
      setErrors(formErrors);
    }
  };

  return (
    <div style={styles.modal}>
      <form onSubmit={handleSubmit}>
        {/* Поля форми для введення даних продукту */}
        <label htmlFor="productName">Product Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />
        {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
        
        <label htmlFor="quantity">Quantity:</label>
        <input
          name="count"
          type="number"
          value={formData.count}
          onChange={handleChange}
          placeholder="quantity"
          style={styles.input}
        />
        {errors.count && <div style={{color: 'red'}}>{errors.count}</div>}
        
        <label htmlFor="photo">Photo:</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="URL photo"
          style={styles.input}
        />
        {errors.imageUrl && <div style={{color: 'red'}}>{errors.imageUrl}</div>}
        
        <label htmlFor="width">Width:</label>
        <input
          name="width"
          type="number"
          value={formData.size.width}
          onChange={handleChange}
          placeholder="width"
          style={styles.input}
        />
        {errors.width && <div style={{color: 'red'}}>{errors.width}</div>}
        
        <label htmlFor="height">Height:</label>
        <input
          name="height"
          type="number"
          value={formData.size.height}
          onChange={handleChange}
          placeholder="height"
          style={styles.input}
        />
        {errors.height && <div style={{color: 'red'}}>{errors.height}</div>}
        
        <label htmlFor="weight">Weight:</label>
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="weight"
          style={styles.input}
        />
        {errors.weight && <div style={{color: 'red'}}>{errors.weight}</div>}
        
        {/* Кнопки для збереження або скасування змін */}
        <button type="submit" style={styles.button}>Save</button>
        <button type="button" onClick={onCancel} style={styles.button}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductModal;
