import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/ProductFilter/ProductFilter';
import { useStore } from '../store/useStore';

export const ProductsPage: React.FC = () => {
    const { getFilteredProducts, toggleLike, removeProduct, setFilter } = useStore();
    const products = getFilteredProducts();

    return (
        <div className="products-page">
            <h1>Products</h1>
            <ProductFilter onFilterChange={setFilter} />
            <ProductList
                products={products}
                onLike={toggleLike}
                onDelete={removeProduct}
            />
        </div>
    );
};