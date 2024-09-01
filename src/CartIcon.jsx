import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = {
  cartIcon: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const CartIcon = () => {
  const navigate = useNavigate();

  const handleOpenCartPage = () => {
    navigate('/cartpage');  // Navigate to the cart page
  };

  return (
    <div style={styles.cartIcon} onClick={handleOpenCartPage}>
      <ShoppingCartIcon />
    </div>
  );
};

export default CartIcon;
