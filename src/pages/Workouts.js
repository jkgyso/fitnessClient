import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';

export default function Workouts() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState(null); 

  const fetchData = () => {
    fetch('https://fitness-tracker-1-d3lc.onrender.com/workouts/getMyWorkouts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]); 
        }
      })
      .catch(err => {
        console.error("Error fetching workouts: ", err);
        setWorkouts([]); 
      });
  };

  useEffect(() => {
    if (user.id) {
      fetchData();
    }
  }, [user.id]); 

  if (!user.id) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {workouts === null ? ( 
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : workouts.length > 0 ? ( 
        <>
          <h1 className='text-center mt-5'>My Workouts</h1>
          <Row>
            {workouts.map(workout => (
              <Col md={3} key={workout._id}>
                <WorkoutCard workout={workout} fetchData={fetchData} />
              </Col>
            ))}
          </Row>
        </>
      ) : ( 
        <h1 className="text-center mt-5">No Workouts Found</h1>
      )}
    </>
  );
}
