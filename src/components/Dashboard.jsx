import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Nav from './Nav';
import Reports from './Reports';

const Dashboard = () => {
	const { user } = UserAuth();
	const [patients, setPatients] = useState([]); // get patients from firestore
	const [current, setCurrent] = useState(null); // selected patient for view reports

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

	useEffect(() => {
		current ? console.log(current) : console.log('no patient selected');
	}, [current]);

	return (
		<div>
			<Nav />

			<div className="py-10">
				<header>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight text-gray-900">
							Dashboard
						</h1>
					</div>
				</header>
				{!current ? (
					<main>
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							<div className="mt-8 flex flex-col">
								<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
										<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
											<table className="min-w-full divide-y divide-gray-300">
												<thead className="bg-gray-50">
													<tr>
														<th
															scope="col"
															className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
														>
															Patient Name
														</th>
														<th
															scope="col"
															className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
														>
															Diagnosis
														</th>
														<th
															scope="col"
															className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
														>
															Location
														</th>
														<th
															scope="col"
															className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
														>
															Therapist
														</th>
														<th
															scope="col"
															className="relative py-3.5 pl-3 pr-4 sm:pr-6"
														>
															<span className="sr-only">View</span>
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-gray-200 bg-white">
													{patients.map((patient, index) => (
														<tr key={index}>
															<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																{patient.data().name}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{patient.data().dx}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{patient.data().location}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{patient.data().therapist}
															</td>
															<td className="whitespace-nowrap py-4 pr-4 pl-4 sm:pr-6">
																<button
																	type="button"
																	onClick={() => setCurrent(patient)}
																	className="w-[75%] justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
																>
																	View Report
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</main>
				) : null}
			</div>
			{current ? <Reports patient={current} /> : null}
		</div>
	);
};

export default Dashboard;
