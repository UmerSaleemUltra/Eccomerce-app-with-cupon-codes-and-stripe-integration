import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { removeItem, incrementQuantity, decrementQuantity, clearCart } from './redux/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  cartContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '80%',
    maxWidth: '800px',
    margin: '40px auto',
    textAlign: 'center',
    padding: '20px',
  },
  cartItem: {
    padding: '10px',
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
    padding: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  itemDetails: {
    flex: 1,
    textAlign: 'left',
    marginLeft: '20px',
  },
  title: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  price: {
    color: '#e63946',
    fontWeight: 'bold',
  },
  total: {
    fontWeight: 'bold',
    marginTop: '5px',
  },
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const totalCostAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      setTotalItems(totalItemsCount);
      setTotalCost(totalCostAmount.toFixed(2));
    }
  }, [cartItems]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckout = () => {
    // Handle form submission logic here
    console.log('Form Data:', formData);
    dispatch(clearCart());
    handleClose();
  };

  return (
    <Box style={styles.cartContainer}>
      <Typography variant="h4">Shopping Cart</Typography>
      {totalItems > 0 && (
        <Typography variant="h6">
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
          <Button onClick={handleOpen} style={styles.button}>
            Checkout
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="cardNumber"
            label="Card Number"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="expirationDate"
            label="Expiration Date (MM/YY)"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.expirationDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="cvv"
            label="CVV"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.cvv}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCheckout} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
