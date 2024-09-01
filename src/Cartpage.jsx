import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, IconButton, Typography, Divider } from '@mui/material';
import { removeItem, incrementQuantity, decrementQuantity } from './redux/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Ptqx509wSWXmHDngNoR39GDEykthEIpHKL4tfsniaz8XMGJGEtpoVJJu5FCbo3tyfgpHy1bj84ZUtE0UJRXzfeM00g5et0OZK');

const styles = {
  cartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    width: '80%',
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
  },
  cartItem: {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    margin: '0 10px',
  },
  button: {
    marginTop: '30px',
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  image: {
    width: '110px',
    height: '110px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  itemDetails: {
    flex: 1,
    textAlign: 'left',
    marginLeft: '20px',
  },
  title: {
    fontSize: '18px',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  price: {
    color: '#e63946',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  total: {
    fontWeight: 'bold',
    marginTop: '8px',
    fontSize: '16px',
  },
  cardElement: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const totalCostAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      setTotalItems(totalItemsCount);
      setTotalCost(totalCostAmount.toFixed(2));
    }
  }, [cartItems]);

  useEffect(() => {
    // Simulate creating a Payment Intent and get client secret
    const fetchClientSecret = async () => {
      // Simulated client secret (for demonstration purposes only)
      setClientSecret('sk_test_51Ptqx509wSWXmHDnRta7ilJcUcoStm79KSlmDcGHf8sc6L18clZSFTNr0D1xfwLF9HRLSVDhMy1B4fL8IR06HR8o00cLRJj194'); // Replace this with actual client secret from backend
    };

    fetchClientSecret();
  }, []);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item));
    } else {
      handleRemoveItem(item);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Your Customer Name',
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
    }
  };

  return (
    <Box style={styles.cartContainer}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {totalItems > 0 && (
        <Typography variant="h6" gutterBottom>
          You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart. Total cost: ${totalCost}
        </Typography>
      )}
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img
                style={styles.image}
                src={item.image}
                alt={item.title}
              />
              <div style={styles.itemDetails}>
                <Typography style={styles.title}>{item.title}</Typography>
                <Typography style={styles.price}>${item.price.toFixed(2)}</Typography>
                <div style={styles.quantityControl}>
                  <IconButton
                    onClick={() => handleDecrementQuantity(item)}
                    style={styles.iconButton}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleIncrementQuantity(item)}
                    style={styles.iconButton}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
                <Typography style={styles.total}>Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
              </div>
              <IconButton
                onClick={() => handleRemoveItem(item)}
                style={styles.iconButton}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Divider variant="middle" />
          <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
              <CardElement options={styles.cardElement} />
              <Button type="submit" style={{ ...styles.button, marginTop: '20px' }}>
                Pay Now
              </Button>
            </form>
          </Elements>
        </div>
      )}
    </Box>
  );
};

export default Cart;
