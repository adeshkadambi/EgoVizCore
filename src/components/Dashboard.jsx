import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Nav from './Nav';
import Reports from './Reports';
import SearchBar from './SearchBar';
import PatientTable from './PatientTable';

const Dashboard = () => {
	const { user } = UserAuth();
	const [patients, setPatients] = useState([]); // get patients from firestore
	const [current, setCurrent] = useState(null); // selected patient for view reports
	const [searchTerm, setSearchTerm] = useState(''); // filter by search bar

	useEffect(() => {
		async function fetchData() {
			const q = query(
				collection(db, 'patients'),
				where('show', '==', `${user.uid}`)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setPatients((patients) => [...patients, doc]);
			});
		}
		fetchData();
	}, [user]);

	const closePatient = () => setCurrent(null);

	return (
		<div>
			<Nav />

			<div className="py-10">
				<header>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight text-slate-900 inline">
							Dashboard
						</h1>
						<p className="inline ml-1 text-slate-400">Beta.</p>
						<p className="font-light text-sm text-slate-500 text-justify mt-1">
							Disclaimer: This dashboard aims to provide an overview of patient
							hand use at home by including previously validated hand use
							metrics. Metrics for hand use quantity include the proportion of
							interaction across total recording time, the number of
							interactions per hour, and the average duration of interactions.
							Metrics for hand usage quality and context include an activity
							breakdown by ADL category, including objects used, and video
							snippets. Please note that this dashboard is actively in
							development and your feedback is greatly appreciated.
						</p>
					</div>
				</header>
				{!current ? (
					<main>
						<div className="max-w-7xl mx-auto mt-8 flex flex-col sm:px-6 lg:px-8">
							<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<SearchBar searchTermSetter={setSearchTerm} />
									<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<PatientTable
											pts={patients}
											searchValue={searchTerm}
											currentPatientSetter={setCurrent}
										/>
									</div>
								</div>
							</div>
						</div>
					</main>
				) : (
					<Reports patient={current} onClose={closePatient} />
				)}
			</div>
		</div>
	);
};

export default Dashboard;
