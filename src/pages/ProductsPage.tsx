import React, { useEffect } from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/ProductFilter/ProductFilter';
import { useStore } from '../store/useStore';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {
    const {
        getFilteredProducts,
        toggleLike,
        removeProduct,
        setFilter,
        fetchProducts,
        addRandomProduct,
        isLoading,
        error
    } = useStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const products = getFilteredProducts();

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="products-page">
            <h1>Products</h1>
            <div className="controls">
                <ProductFilter onFilterChange={setFilter} />
                <button
                    className="add-random-button"
                    onClick={addRandomProduct}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Random Product'}
                </button>
            </div>
            {isLoading && !products.length ? (
                <div className="loading">Loading products...</div>
            ) : (
                <ProductList
                    products={products}
                    onLike={toggleLike}
                    onDelete={removeProduct}
                />
            )}
        </div>
    );
};