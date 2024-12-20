import React from 'react';
import './styles.css';

interface ProductFilterProps {
    onFilterChange: (filter: 'all' | 'liked') => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    return (
        <div className="filter-container">
            <button onClick={() => onFilterChange('all')}>All Products</button>
            <button onClick={() => onFilterChange('liked')}>Liked Products</button>
        </div>
    );
};