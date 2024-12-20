// src/pages/ProductsPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/ProductFilter/ProductFilter';
import { useStore } from '../store/useStore';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products,
    filter,
    isLoading,
    error,
    fetchProducts,
    addRandomProduct,
    toggleLike,
    removeProduct,
    setFilter
  } = useStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.isLiked);

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button onClick={() => fetchProducts()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="controls">
        <ProductFilter 
          activeFilter={filter} 
          onFilterChange={setFilter} 
        />
        <button 
          className="add-random-button"
          onClick={addRandomProduct}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Random Product'}
        </button>
        <button 
          className="create-product-button"
          onClick={() => navigate('/create-product')}
        >
          Create New Product
        </button>
      </div>
      {isLoading && !products.length ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <ProductList 
          products={filteredProducts}
          onLike={toggleLike}
          onDelete={removeProduct}
        />
      )}
    </div>
  );
};