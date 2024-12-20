// src/components/SearchAndFilter/SearchAndFilter.tsx
import React from 'react';
import './SearchAndFilter.css';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <select
        className="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};