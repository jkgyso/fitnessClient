import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../App.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function registerUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure the passwords match.',
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Password must be at least 8 characters',
        text: 'Please enter a password that is at least 8 characters long.',
      });
      return;
    }

    fetch('https://fitness-tracker-1-d3lc.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Registered Successfully') {
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          Swal.fire({
            title: 'Registration Successful',
            icon: 'success',
            text: 'Thank you for registering!',
          });
        }
      })
      .catch((error) => {
        console.error('Error in registering user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred while registering. Please try again later.',
        });
      });
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={10} sm={8} md={6}>
          <div className="register-box">
            <h1 className="text-center">Register</h1>
            <Form onSubmit={registerUser}>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="warning" type="submit" className="mt-3">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
