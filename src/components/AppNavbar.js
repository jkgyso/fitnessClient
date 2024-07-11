import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar bg="transparent" expand="lg" variant="dark" className="navbar-dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="text-dark">Fitness Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact className="text-dark">Home</Nav.Link>
                        {user.id !== null ? (
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact className="text-dark">My Workouts</Nav.Link>
                                <Nav.Link as={Link} to="/addWorkout" className="text-dark">Add Workout</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="text-dark">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-dark">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="text-dark">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
