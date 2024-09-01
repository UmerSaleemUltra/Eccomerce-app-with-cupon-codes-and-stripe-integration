import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      navigate(`/`); // Replace `/dashboard` with the desired path after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Box
        sx={{
          width: 400,
          padding: '2rem',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" className="mb-4 text-center">
          Login
        </Typography>
        {error && <div className="alert alert-danger">{error}</div>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          className="mb-3"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
