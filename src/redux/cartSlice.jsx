import { createSlice } from '@reduxjs/toolkit';

// Helper function to load the cart state from local storage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartItems');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error('Could not load cart state', err);
    return [];
  }
};

// Initial state
const initialState = {
  items: loadCartState(),
  savedForLater: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      } else if (itemIndex >= 0 && state.items[itemIndex].quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    saveForLater: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const savedItem = state.items[itemIndex];
        state.savedForLater.push(savedItem);
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart, saveForLater } = cartSlice.actions;

export default cartSlice.reducer;
