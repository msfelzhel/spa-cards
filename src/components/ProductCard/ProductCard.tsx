import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/types';
import './styles.css';

interface ProductCardProps {
    product: Product;
    onLike: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onLike, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.card-actions')) {
            navigate(`/products/${product.id}`);
        }
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <div className="product-content">
                <h3>{product.title}</h3>
                <p className="truncated-text">{product.description}</p>
            </div>
            <div className="card-actions">
                <button
                    className={`action-button like-button ${product.isLiked ? 'liked' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike(product.id);
                    }}
                >
                    {product.isLiked ? '❤️' : '🤍'}
                </button>
                <button
                    className="action-button delete-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(product.id);
                    }}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};