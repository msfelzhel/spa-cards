import React, { useState } from 'react';
import './AdvancedFilter.css';

interface FilterOptions {
  priceRange: {
    min: string;
    max: string;
  };
  brand: string;
  category: string;
  stock: {
    min: string;
    max: string;
  };
}

interface AdvancedFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  brands: string[];
  categories: string[];
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  onFilterChange,
  brands,
  categories
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: '', max: '' },
    brand: '',
    category: '',
    stock: { min: '', max: '' }
  });

  const handleInputChange = (
    field: string,
    value: string,
    subField?: 'min' | 'max'
  ) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (subField) {
        newFilters[field as keyof FilterOptions] = {
          ...newFilters[field as keyof FilterOptions],
          [subField]: value
        };
      } else {
        newFilters[field as keyof FilterOptions] = value;
      }
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      priceRange: { min: '', max: '' },
      brand: '',
      category: '',
      stock: { min: '', max: '' }
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="advanced-filter">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'} 🔍
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min price"
                value={filters.priceRange.min}
                onChange={(e) => handleInputChange('priceRange', e.target.value, 'min')}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max price"
                value={filters.priceRange.max}
                onChange={(e) => handleInputChange('priceRange', e.target.value, 'max')}
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Brand</h3>
            <select
              value={filters.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <select
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Stock Range</h3>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min stock"
                value={filters.stock.min}
                onChange={(e) => handleInputChange('stock', e.target.value, 'min')}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max stock"
                value={filters.stock.max}
                onChange={(e) => handleInputChange('stock', e.target.value, 'max')}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={handleApplyFilters}>Apply Filters</button>
            <button onClick={handleReset}>Reset Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};