import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddWorkout = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch('https://fitness-tracker-1-d3lc.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        duration
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add workout',
            text: data.error
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Workout Added',
            text: 'The workout has been added successfully.'
          });
          setName('');
          setDuration('');
          navigate('/workouts');
        }
      })
      .catch(error => {
        console.error('Error adding workout:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add workout. Please try again later.'
        });
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6}>
          <div className="add-workout-box">
            <h2 className="text-center">Add Workout</h2>
            <Form onSubmit={handleAddWorkout}>
              <Form.Group controlId="formWorkoutName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter workout name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formWorkoutDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration in minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
};

export default AddWorkout;
