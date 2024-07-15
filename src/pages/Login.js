import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import '../App.css';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [redirectToWorkouts, setRedirectToWorkouts] = useState(false);

    function authenticate(e) {
        e.preventDefault();
        fetch('https://fitness-tracker-1-d3lc.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access)
                    .then(() => {
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            text: "Welcome to Fitness Tracker!"
                        }).then(() => {
                            setRedirectToWorkouts(true);
                        });
                    });
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        });

        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        return fetch('https://fitness-tracker-1-d3lc.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
            });
        });
    };

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    if (redirectToWorkouts || user.id) {
        return <Navigate to="/workouts/getMyWorkouts" />;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8} lg={6} className="login-box p-4">
                    <Form onSubmit={(e) => authenticate(e)}>
                        <h1 className="text-center p-2">Login</h1>
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="warning" type="submit" className='mt-3'>
                                Submit
                            </Button>
                        </div>
                    </Form>

                    <p className="text-center mt-3">
                        Don't have an account yet? <Link to="/register">Click here</Link> to register.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
