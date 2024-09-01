// src/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './Firebase'; // Import your Firebase auth

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false); // Set loading to false once auth check is complete
      });

      return () => unsubscribe(); // Cleanup on unmount
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
