// src/components/ProductFilter/ProductFilter.tsx
import React from 'react';
import './styles.css';

interface ProductFilterProps {
  activeFilter: 'all' | 'liked';
  onFilterChange: (filter: 'all' | 'liked') => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <button 
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All Products
      </button>
      <button 
        className={`filter-button ${activeFilter === 'liked' ? 'active' : ''}`}
        onClick={() => onFilterChange('liked')}
      >
        Liked Products
      </button>
    </div>
  );
};