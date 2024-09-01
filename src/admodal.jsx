// src/AdModal.jsx
import React from 'react';
import { Modal, Box, Button } from '@mui/material';

// Define CSS styles for the AdModal
const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
  },
  adImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  adTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  adDescription: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    flex: 1,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#e63946',
    border: 'none',
    cursor: 'pointer',
  },
  proceedButton: {
    backgroundColor: '#007bff',
    border: 'none',
    cursor: 'pointer',
  },
};

const AdModal = ({ open, onClose, onShowProduct, product }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="ad-modal-title"
      aria-describedby="ad-modal-description"
      style={styles.modal}
    >
      <Box style={styles.adContainer}>
        <img src={'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$'} alt={product?.title} style={styles.adImage} />
        <div style={styles.adTitle}>Exclusive Offer Just for You!</div>
        <div style={styles.adDescription}>Check out this exciting product that you might love. Don't miss this opportunity to explore more details.</div>
        <div style={styles.buttonContainer}>
          <Button
            onClick={onClose}
            style={{ ...styles.button, ...styles.closeButton }}
          >
            Close
          </Button>
          <Button
            onClick={onShowProduct}
            style={{ ...styles.button, ...styles.proceedButton }}
          >
            View Details
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AdModal;
