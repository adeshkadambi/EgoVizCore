import React from 'react';
import ChartItem from './ChartItem';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { videos } from '../data/videodata';

const Reports = (props) => {
	const patient = props.patient;
	const quantity = patient.data().quantity;
	const activity = patient.data().activity;

	const dates = quantity[0].split(',');
	const minRecord = quantity[1].split(',').map(Number);
	const pctIntL = quantity[2].split(',').map(Number);
	const pctIntR = quantity[3].split(',').map(Number);
	const numIntL = quantity[4].split(',').map(Number);
	const numIntR = quantity[5].split(',').map(Number);
	const avgIntL = quantity[6].split(',').map(Number);
	const avgIntR = quantity[7].split(',').map(Number);

	const adls = activity[0].split(', ');
	const minADL = activity[1].split(',').map(Number);

	return (
		<div>
			<main className="mt-4">
				<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
						<button
							type="button"
							className="rounded-lg p-2 mb-2 -mt-4 text-slate-500 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
							onClick={props.onClose}
						>
							<span>
								<ChevronLeftIcon
									className="h-6 inline-block align-middle"
									aria-hidden="true"
								/>
							</span>
							<span className="inline-block pr-2 align-middle">
								Back to All
							</span>
						</button>
						<div className="border-b border-gray-300 flex items-center justify-between">
							<h1 className="text-2xl font-bold pb-2">
								{patient.data().name}'s Hand Use Report
							</h1>
						</div>

						<div className="grid grid-cols-2 gap-12 mt-4">
							<ChartItem
								type={'bar'}
								title={'Minutes Recorded'}
								subtitle={'per day'}
								labels={dates}
								data={minRecord}
							/>
							<ChartItem
								type={'line'}
								title={'Percentage Interaction'}
								subtitle={'how much were they "using" their hands?'}
								labels={dates}
								dataL={pctIntL}
								dataR={pctIntR}
							/>
							<ChartItem
								type={'line'}
								title={'Number of Interactions'}
								subtitle={'per hour'}
								labels={dates}
								dataL={numIntL}
								dataR={numIntR}
							/>
							<ChartItem
								type={'line'}
								title={'Average Interaction Duration'}
								subtitle={'seconds'}
								labels={dates}
								dataL={avgIntL}
								dataR={avgIntR}
							/>
							<ChartItem
								type={'pie'}
								title={'Activity Breakdown'}
								subtitle={'minutes'}
								labels={adls}
								data={minADL}
							/>
							<div className="">
								<div className="mb-4">
									<h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">
										Video Snippets
									</h1>
									<p className="inline text-sm ml-1 text-slate-400">
										(click to view)
									</p>
								</div>
								<ul className="divide-y divide-gray-200 grid grid-cols-2 gap-8">
									{videos.map((video) => (
										<div key={video.name} className="py-4">
											<a
												href={video.url}
												className="text-sm font-medium text-gray-900 hover:text-gray-500"
											>
												{video.name}
											</a>
											<p className="text-sm text-gray-500">{video.duration}</p>
										</div>
									))}
								</ul>
							</div>
							{/* <div className="col-span-2">
								<div className="mb-4">
									<h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">
										Hand Posture Usage
									</h1>
									<p className="inline text-sm ml-1 text-slate-400">
										(highlights from videos)
									</p>
								</div>
								<div className="grid grid-cols-4 gap-4">
									<div>
										<img
											src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating.png?alt=media&token=b8aa851c-2c58-4696-82b4-e11f7bf553d8"
											alt=""
										/>
									</div>
									<div>
										<img
											src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating2.png?alt=media&token=2f006b37-4e40-4357-b1d6-ba7973384d08"
											alt=""
										/>
									</div>
									<div>
										<img
											src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating3.png?alt=media&token=fdfff223-7c26-4128-8243-e289ebc7b47b"
											alt=""
										/>
									</div>
									<div>
										<img
											src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_writing.png?alt=media&token=dcb080cb-c4b0-465f-b58f-887c58cc3568"
											alt=""
										/>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Reports;
