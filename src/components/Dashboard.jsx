import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      querySnapshot.forEach((doc) => {
        setPatients(patients => [...patients, doc.data()]);
      });
    }
    fetchData();
  }, []);

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			console.log('You are logged out');
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className="max-w-[600px] mx-auto my-16 p-4">
			<h1 className="text-2xl font-bold py-4">Account</h1>
			<p>User Email: {user && user.email}</p>
			<p>User ID: {user.uid}</p>

			<button onClick={handleLogout} className="border px-6 py-2 my-4">
				Logout
			</button>
			{
        patients.map((patient, index) => {
          return (
            <div key={index}>
              <p>Name: {patient.name}</p>
              <p>Dx: {patient.dx}</p>
              <p>Therapist: {patient.therapist}</p>
              <p>Location: {patient.location}</p>
            </div>
          );
        })
      }
		</div>
	);
};

export default Dashboard;
