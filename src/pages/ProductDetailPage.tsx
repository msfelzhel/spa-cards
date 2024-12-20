import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, toggleLike } = useStore();

    const product = products.find(p => p.id === id);

    if (!product) {
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
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="product-detail-image"
                />

                <div className="product-detail-content">
                    <div className="product-detail-header">
                        <h1>{product.title}</h1>
                        <button
                            className={`like-button ${product.isLiked ? 'liked' : ''}`}
                            onClick={() => toggleLike(product.id)}
                        >
                            {product.isLiked ? '❤️' : '🤍'}
                        </button>
                    </div>

                    <p className="product-detail-description">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};