import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { addItem } from './redux/cartSlice';
import CartIcon from './CartIcon';

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  productCard: {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    boxSizing: 'border-box',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  productCardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'left',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'left',
  },
  price: {
    color: '#e63946',
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '20px',
    textAlign: 'left',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    marginTop: '20px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: '#e63946',
    fontSize: '18px',
    fontWeight: '600',
  },
  couponContainer: {
    marginTop: '20px',
    textAlign: 'left',
  },
  couponInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  couponButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  couponMessage: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#333',
  },
  addToCartButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    marginTop: '20px',
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        setDiscountedPrice(data.price);  // Initially, the price is the original price
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = { ...product, price: discountedPrice };
      dispatch(addItem(productToAdd));
      alert('Product added to cart!');
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'DISCOUNT10') {
      const discount = product.price * 0.1;
      setDiscountedPrice(product.price - discount);
      setCouponMessage('Coupon applied! 10% off.');
    } else {
      setCouponMessage('Invalid coupon code.');
    }
  };

  const handleShareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Product URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container}>
        <p>No product found</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div
        style={styles.productCard}
        onMouseEnter={(e) => e.currentTarget.style = { ...styles.productCard, ...styles.productCardHover }}
        onMouseLeave={(e) => e.currentTarget.style = styles.productCard}
      >
        <img src={product.image} alt={product.title} style={styles.image} />
        <h2 style={styles.title}>{product.title}</h2>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${discountedPrice.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          style={styles.addToCartButton}
        >
          Add to Cart
        </button>

        <div style={styles.couponContainer}>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            style={styles.couponInput}
          />
          <button
            onClick={handleApplyCoupon}
            style={styles.couponButton}
          >
            Apply Coupon
          </button>
          {couponMessage && <p style={styles.couponMessage}>{couponMessage}</p>}
        </div>

        <button
          onClick={handleShareProduct}
          style={styles.button}
        >
          Share Product
        </button>
      </div>
      <CartIcon />
    </div>
  );
};

export default ProductDetail;
