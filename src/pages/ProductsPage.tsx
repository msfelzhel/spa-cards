// src/pages/ProductsPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/ProductFilter/ProductFilter';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchAndFilter } from '../components/SearchAndFilter/SearchAndFilter';
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

  // Состояния для поиска и фильтрации
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, [products]);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    let filtered = filter === 'all' 
      ? products 
      : products.filter(product => product.isLiked);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }

    return filtered;
  }, [products, filter, searchQuery, selectedCategory]);

  // Пагинация
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />

      {isLoading && !products.length ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <>
          <div className="products-count">
            Found: {filteredProducts.length} products
          </div>
          <ProductList 
            products={currentProducts}
            onLike={toggleLike}
            onDelete={removeProduct}
          />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};