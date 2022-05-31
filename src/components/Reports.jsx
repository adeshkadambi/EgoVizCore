import React from 'react';

const Reports = (props) => {
	const patient = props.patient;

	return (
		<div>
			<main className="">
				<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 text-lg font-medium">
						<p>Reports for {patient.data().name}</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Reports;
