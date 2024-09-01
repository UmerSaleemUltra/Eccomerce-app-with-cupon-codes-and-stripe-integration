import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import Details from './Details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Cartpage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SharedCartPage from './SharedCartPage';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Contact from './Contact';
import ProtectedRoute from './ProtectedRoute';
import { onAuthStateChanged } from './Firebase';

const stripePromise = loadStripe('pk_test_51Ptqx509wSWXmHDngNoR39GDEykthEIpHKL4tfsniaz8XMGJGEtpoVJJu5FCbo3tyfgpHy1bj84ZUtE0UJRXzfeM00g5et0OZK');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
            {user && <h1>Welcome {user.email}</h1>}
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/Details/:productId" element={<Details />} />
              <Route path="/cartpage" element={<ProtectedRoute component={Cart} />} />
              <Route path="/shared-cart/:cartId" element={<ProtectedRoute component={SharedCartPage} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </header>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
