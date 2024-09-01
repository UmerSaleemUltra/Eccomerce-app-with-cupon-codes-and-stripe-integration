// src/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdModal from './admodal';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate(); // Correctly initialize useNavigate

  const handleOpenAdModal = (product) => {
    setSelectedProduct(product);
    setAdModalOpen(true);
  };

  const handleCloseAdModal = () => {
    setAdModalOpen(false);
  };

  const handleShowProduct = () => {
    setAdModalOpen(false);
    if (selectedProduct) {
      navigate(`/details/${selectedProduct.id}`); // Navigate to product detail page
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <p style={{ color: '#e63946', fontSize: '16px', fontWeight: 'bold' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
      {products.map((product) => (
        <div key={product.id} style={{ width: '200px', margin: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', textAlign: 'center' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }} />
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{product.title}</h2>
          <p style={{ color: '#28a745', fontSize: '18px', marginBottom: '10px' }}>${product.price}</p>
          <button onClick={() => handleOpenAdModal(product)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Show Details</button>
        </div>
      ))}
      <AdModal open={adModalOpen} onClose={handleCloseAdModal} onShowProduct={handleShowProduct} />
    </div>
  );
};

export default ProductList;
