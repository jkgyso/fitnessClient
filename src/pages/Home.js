import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa';

import HeroImage from '../images/hero.png';

export default function Home() {
    return (
        <Container fluid className="p-0">
            <Row className="bg-image d-flex align-items-center justify-content-center" style={{ 
                backgroundImage: `url(${HeroImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',  
                minHeight: '75vh', 
                opacity: 0.9
            }}>
                <Col className="text-center text-white">
                    <h1 className="mb-3">Welcome To Your Fitness Tracker</h1>
                    <p className="mb-4">Efficiently track and optimize your fitness journey with our intuitive tracker</p>
                    <Link className="btn btn-warning" to={'/workouts'}><strong>Check Your Workout Items</strong></Link>
                </Col>
            </Row>

            <Row className="custom-gradient text-white p-4">
            <Col xs={12} md={4} className="text-center">
                <FaDumbbell size={50} className="text-warning mb-3" />
                <h4 className="text-warning">Personalized Workout Recommendations</h4>
                <p>
                    Utilize machine learning algorithms to suggest personalized workout routines based on user goals and past activity.
                </p>
            </Col>
            <Col xs={12} md={4} className="text-center">
                <FaRunning size={50} className="text-warning mb-3" />
                <h4 className="text-warning">Social Sharing and Challenges</h4>
                <p>
                    Implement a feature where users can share their workout achievements, challenge friends to fitness goals, and track their progress together.
                </p>
            </Col>
            <Col xs={12} md={4} className="text-center">
                <FaHeartbeat size={50} className="text-warning mb-3" />
                <h4 className="text-warning">Integration with Wearable Devices</h4>
                <p>
                    Enable integration with popular fitness trackers like Fitbit or Apple Watch to automatically sync workout data, providing users with seamless tracking and analysis of their fitness metrics.
                </p>
            </Col>
        </Row>
        </Container>
    );
}
