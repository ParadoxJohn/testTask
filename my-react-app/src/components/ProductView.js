import React, { useState } from 'react';
import { styles } from '../styles/style';

const ProductView = ({ product, onClose }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(product.comments || []);

  // Обробка додавання нового коментаря
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const newComment = {
      description: commentText,
      date: new Date().toLocaleString(),
      productId: product._id, 
    };

    try {
      const response = await fetch(`http://localhost:8000/products/${product._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const updatedProduct = await response.json(); 
        setComments(updatedProduct.comments); 
        setCommentText(''); 
      } else {
        console.error('Failed to add comment:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Обробка видалення коментаря
  const handleDeleteComment = async (commentId) => {
    const updatedComments = comments.filter(comment => comment._id !== commentId);

    try {
      const response = await fetch(`http://localhost:8000/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, comments: updatedComments }),
      });

      if (response.ok) {
        setComments(updatedComments);
      } else {
        console.error('Failed to delete comment:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div style={styles.modal}>
      <h2>{product.name}</h2>
      <p>Quantity: {product.count}</p>
      <p>Size: {product.size.width}x{product.size.height}</p>
      <p>Weight: {product.weight}</p>
      <p>Comments:</p>
      <ul>
        {/* Відображаємо список коментарів */}
        {comments.map((comment, index) => (
          <li key={comment._id || index}> 
            <p>{comment.description}</p>
            <small>{comment.date}</small>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete comment</button>
          </li>
        ))}
      </ul>
      {/* Текстове поле для додавання нового коментаря */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleAddComment}>Add comment</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductView;
