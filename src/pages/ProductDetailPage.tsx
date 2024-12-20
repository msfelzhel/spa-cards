import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentProduct, 
    fetchProductById, 
    toggleLike,
    isLoading,
    error 
  } = useStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (isLoading) {
    return <div className="product-detail-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="product-detail-error">
        <h2>{error}</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="product-detail-error">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={() => navigate('/products')}>
        ← Back to Products
      </button>
      
      <div className="product-detail-container">
        <div className="product-detail-image-container">
          <img 
            src={currentProduct.imageUrl} 
            alt={currentProduct.title} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-detail-content">
          <div className="product-detail-header">
            <h1>{currentProduct.title}</h1>
            <button 
              className={`like-button ${currentProduct.isLiked ? 'liked' : ''}`}
              onClick={() => toggleLike(currentProduct.id)}
            >
              {currentProduct.isLiked ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="product-detail-info">
            {currentProduct.brand && (
              <p><strong>Brand:</strong> {currentProduct.brand}</p>
            )}
            {currentProduct.category && (
              <p><strong>Category:</strong> {currentProduct.category}</p>
            )}
            {currentProduct.price !== undefined && (
              <p><strong>Price:</strong> ${currentProduct.price}</p>
            )}
            {currentProduct.rating !== undefined && (
              <p><strong>Rating:</strong> {currentProduct.rating} ⭐</p>
            )}
            {currentProduct.stock !== undefined && (
              <p><strong>In Stock:</strong> {currentProduct.stock} units</p>
            )}
          </div>
          
          <div className="product-detail-description">
            <h2>Description</h2>
            <p>{currentProduct.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};