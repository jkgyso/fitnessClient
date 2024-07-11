import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function WorkoutCard({ workout, fetchData }) {
  const { _id, name, duration, status } = workout;

  const [show, setShow] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = (id) => {
    fetch(`https://fitness-tracker-1-d3lc.onrender.com/workouts/updateWorkout/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: updatedName,
        duration: updatedDuration
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Update',
            text: data.error
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Workout Updated',
            text: 'The workout has been updated successfully.'
          });
          fetchData();
          handleClose();
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`https://fitness-tracker-1-d3lc.onrender.com/workouts/deleteWorkout/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Deletion',
            text: data.error
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Workout Deleted',
            text: 'The workout has been deleted successfully.'
          });
          fetchData();
        }
      });
  };

  const handleComplete = (id) => {
    fetch(`https://fitness-tracker-1-d3lc.onrender.com/workouts/completeWorkoutStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        status: 'completed'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Update',
            text: data.error
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Workout Completed',
            text: 'The workout has been marked as completed.'
          });
          fetchData();
        }
      });
  };

  return (
    <Card className="mt-3 mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Duration:</Card.Subtitle>
        <Card.Text>{duration} mins</Card.Text>
        <Card.Subtitle>Status:</Card.Subtitle>
        <Card.Text>{status}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around">
        <Button variant="warning" size="sm" onClick={handleShow}>Update</Button>
        <Button variant="danger" size="sm" onClick={() => handleDelete(_id)}>Delete</Button>
        <Button variant="success" size="sm" onClick={() => handleComplete(_id)} disabled={status === 'completed'}>
          Complete
        </Button>
      </Card.Footer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formWorkoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWorkoutDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={updatedDuration}
                onChange={(e) => setUpdatedDuration(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="warning" onClick={() => handleUpdate(_id)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
