import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import Error from './pages/Error';

import './App.css';

import { UserProvider } from './UserContext';

function App() {
    const [user, setUser] = useState({
      id: null
    });

    const unsetUser = () => {
      localStorage.clear();
      setUser({ id: null });
    }

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('https://fitness-tracker-1-d3lc.onrender.com/users/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser({ id: data.user._id });
          }
        });
      }
    }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/workouts" element={<Workouts />} /> 
            <Route path="/addWorkout" element={<AddWorkout />} /> 
            <Route path="*" element={<Error />} /> 
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
