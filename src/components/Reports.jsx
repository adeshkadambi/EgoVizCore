import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Reports = (props) => {
	const patient = props.patient;

    const quantity = patient.data().quantity

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

    const labels = quantity[0].split(',');

    const data = {
        labels,
        datasets: [
          {
            label: 'Minutes Recorded',
            data: quantity[1].split(',').map(Number),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

	return (
		<div>
			<main className="-mt-4">
				<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
						<h1 className="text-xl font-semibold">
							Hand Use Report: {patient.data().name}
						</h1>
						<div className='max-w-[40%] mx-auto'>
                            <Bar options={options} data={data} />
                            {
                                console.log(quantity)
                            }
                        </div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Reports;
