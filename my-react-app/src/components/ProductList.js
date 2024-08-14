import React from 'react';

const ProductList = ({ products, onEdit, onDelete, onView }) => {
  return (
    <ul>
      {/* Перебираємо масив продуктів і відображаємо кожен продукт у списку і після цього кнопки для взаємодії */}
      {products.map((product) => (
        <li key={product._id}>
          {product.name} - {product.count}
          <button onClick={() => onView(product)}>Details</button> 
          <button onClick={() => onEdit(product)}>Edit</button> 
          <button onClick={() => onDelete(product._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;