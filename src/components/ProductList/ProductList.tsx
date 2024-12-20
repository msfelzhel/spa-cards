import React from 'react';
import { Product } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './styles.css';

interface ProductListProps {
  products: Product[];
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onLike, onDelete }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};