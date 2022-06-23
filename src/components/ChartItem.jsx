import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	defaults,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

// TODO: populate page on bar chart click
// REF: https://react-chartjs-2.js.org/docs/working-with-events/

const ChartItem = (props) => {
	defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif';

	const options = {
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
	};

	if (props.type === 'bar') {
		const barData = {
			labels: props.labels,
			datasets: [
				{
					label: 'Minutes Recorded',
					data: props.data,
					backgroundColor: '#38bdf8',
				},
			],
		};

		return (
			<div>
				<div className="mb-4">
					<h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">
						{props.title}
					</h1>
					<p className="inline text-sm ml-1 text-slate-400">
						({props.subtitle})
					</p>
				</div>
				<Bar options={options} data={barData} />
			</div>
		);
	} else if (props.type === 'line') {
		const lineData = {
			labels: props.labels,
			datasets: [
				{
					label: 'Right Hand',
					data: props.dataR,
					borderColor: '#fb7185', // rose-400
					backgroundColor: '#f43f5e', // rose-500
				},
				{
					label: 'Left Hand',
					data: props.dataL,
					borderColor: '#38bdf8', //sky-400
					backgroundColor: '#0ea5e9', //sky-500
				},
			],
		};

		return (
			<div>
				<div className="mb-4">
					<h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">
						{props.title}
					</h1>
					<p className="inline text-sm ml-1 text-slate-400">
						({props.subtitle})
					</p>
				</div>
				<Line options={options} data={lineData} />
			</div>
		);
	} else if (props.type === 'pie') {
		const pieData = {
			labels: props.labels,
			datasets: [
				{
					label: 'Minutes Recorded',
					data: props.data,
					backgroundColor: [
						'#bae6fd',
						'#7dd3fc',
						'#38bdf8',
						'#0ea5e9',
						'#0284c7',
						'#0369a1',
					],
					borderColor: [
						'#f8fafc',
						'#f8fafc',
						'#f8fafc',
						'#f8fafc',
						'#f8fafc',
						'#f8fafc',
					],
					borderWidth: 2,
				},
			],
		};

		return (
			<div>
				<div className="mb-4">
					<h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">
						{props.title}
					</h1>
					<p className="inline text-sm ml-1 text-slate-400">({props.subtitle})</p>
				</div>
				<div className="w-[80%] h-[80%]">
					<Doughnut data={pieData} />
				</div>
			</div>
		);
	}
};

export default ChartItem;
