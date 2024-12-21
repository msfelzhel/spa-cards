import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CreateProductPage } from './pages/CreateProductPage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Header userLogin="msfelzhel" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;