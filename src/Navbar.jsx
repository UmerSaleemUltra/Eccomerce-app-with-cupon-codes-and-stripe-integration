import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import CartIcon from './CartIcon';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const style = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#333',
      color: '#fff',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      gap: '1rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (

    <nav style={style.navbar}>

      <div style={style.logo}>MyLogo</div>
      <div style={style.navLinks}>
        <a href="/" style={style.link}>Home</a>
        <a href="/signup" style={style.link}>Signup</a>
        <a href="/login" style={style.link}>Login</a>
        <a href="/contact" style={style.link}>Contact</a>
      </div>
      <div>

      <CartIcon />

      
        <button
          style={{ ...style.button, marginLeft: '1rem' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
