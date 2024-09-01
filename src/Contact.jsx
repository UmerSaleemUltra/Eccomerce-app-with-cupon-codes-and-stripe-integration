import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { Container, Button, Form } from 'react-bootstrap';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      {submitted && (
        <div className="alert alert-success" role="alert">
          Your message has been sent successfully!
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Send Message
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
