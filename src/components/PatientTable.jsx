import React from 'react';

const PatientTable = (props) => {
	return (
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
					<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
						<span className="sr-only">View</span>
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{props.pts
					// eslint-disable-next-line
					.filter((value) => {
						if (props.searchValue === '') {
							return value;
						} else if (
							value
								.data()
								.name.toLowerCase()
								.includes(props.searchValue.toLowerCase())
						) {
							return value;
						} else if (
							value
								.data()
								.therapist.toLowerCase()
								.includes(props.searchValue.toLowerCase())
						) {
							return value;
						} else if (
							value
								.data()
								.location.toLowerCase()
								.includes(props.searchValue.toLowerCase())
						) {
							return value;
						} else if (
							value
								.data()
								.dx.toLowerCase()
								.includes(props.searchValue.toLowerCase())
						) {
							return value;
						}
					})
					.map((patient, index) => (
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
									onClick={() => props.currentPatientSetter(patient)}
									className="w-[75%] justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
								>
									View Report
								</button>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default PatientTable;
