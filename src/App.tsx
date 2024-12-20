import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;