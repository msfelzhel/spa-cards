import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/ProductFilter/ProductFilter';
import { AdvancedFilter } from '../components/AdvancedFilter/AdvancedFilter';
import { Pagination } from '../components/Pagination/Pagination';
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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Состояние для расширенных фильтров
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: { min: '', max: '' },
    brand: '',
    category: '',
    stock: { min: '', max: '' }
  });

  // Получаем уникальные бренды и категории
  const brands = useMemo(() => 
    [...new Set(products.map(product => product.brand))],
    [products]
  );

  const categories = useMemo(() => 
    [...new Set(products.map(product => product.category))],
    [products]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, advancedFilters]);

  // Применяем все фильтры
  const filteredProducts = useMemo(() => {
    let filtered = filter === 'all' 
      ? products 
      : products.filter(product => product.isLiked);

    // Применяем расширенные фильтры
    if (advancedFilters.priceRange.min) {
      filtered = filtered.filter(
        product => product.price >= Number(advancedFilters.priceRange.min)
      );
    }
    if (advancedFilters.priceRange.max) {
      filtered = filtered.filter(
        product => product.price <= Number(advancedFilters.priceRange.max)
      );
    }
    if (advancedFilters.brand) {
      filtered = filtered.filter(
        product => product.brand === advancedFilters.brand
      );
    }
    if (advancedFilters.category) {
      filtered = filtered.filter(
        product => product.category === advancedFilters.category
      );
    }
    if (advancedFilters.stock.min) {
      filtered = filtered.filter(
        product => product.stock >= Number(advancedFilters.stock.min)
      );
    }
    if (advancedFilters.stock.max) {
      filtered = filtered.filter(
        product => product.stock <= Number(advancedFilters.stock.max)
      );
    }

    return filtered;
  }, [products, filter, advancedFilters]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

      <AdvancedFilter
        onFilterChange={setAdvancedFilters}
        brands={brands}
        categories={categories}
      />

      {isLoading && !products.length ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <>
          <div className="products-count">
            Showing {filteredProducts.length} products
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