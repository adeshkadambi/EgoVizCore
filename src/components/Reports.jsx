import React from "react";
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
  defaults
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

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

const Reports = (props) => {
  const patient = props.patient;
  const quantity = patient.data().quantity;
  const activity = patient.data().activity;

  const dates = quantity[0].split(",");
  const minRecord = quantity[1].split(",").map(Number);
  const pctIntL = quantity[2].split(",").map(Number);
  const pctIntR = quantity[3].split(",").map(Number);
  const numIntL = quantity[4].split(",").map(Number);
  const numIntR = quantity[5].split(",").map(Number);
  const avgIntL = quantity[6].split(",").map(Number);
  const avgIntR = quantity[7].split(",").map(Number);

  const adls = activity[0].split(", ");
  const minADL = activity[1].split(",").map(Number);

  const options = {
    responsive: true,
  };

  // TODO: populate page on bar chart click
  // REF: https://react-chartjs-2.js.org/docs/working-with-events/
  // const chartRef = useRef();
  // const onClick = (event) => {
  //   const get = getElementAtEvent(chartRef.current, event);
  //   console.log(get[0].element.$context.dataIndex);
  // }

  defaults.font.family = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif";

  const labels = dates;

  const barData = {
    labels,
    datasets: [
      {
        label: "Minutes Recorded",
        data: minRecord,
        backgroundColor: "#38bdf8",
      },
    ],
  };

  const pctInt = {
    labels,
    datasets: [
      {
        label: "Right Hand",
        data: pctIntR,
        borderColor: '#fb7185', // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: pctIntL,
        borderColor: '#38bdf8', //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      }
    ],
  };

  const numInt = {
    labels,
    datasets: [
      {
        label: "Right Hand",
        data: numIntR,
        borderColor: '#fb7185', // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: numIntL,
        borderColor: '#38bdf8', //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      }
    ],
  };

  const avgInt = {
    labels,
    datasets: [
      {
        label: "Right Hand",
        data: avgIntR,
        borderColor: '#fb7185', // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: avgIntL,
        borderColor: '#38bdf8', //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      }
    ],
  };

  const adlCats = {
    labels: adls,
    datasets: [
      {
        label: 'Minutes Recorded',
        data: minADL,
        backgroundColor: [
          '#4ade80', // sky-400
          '#2dd4bf', // teal-400
          '#38bdf8',
          '#818cf8',
          '#c084fc',
          '#f472b6',
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
      <main className="-mt-4">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-b border-gray-300">
              <h1 className="text-2xl font-bold pb-2">
                {patient.data().name}'s Hand Use Report
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-12 mt-4">
              <div className="">
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Minutes Recorded</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(per day)</p>
                <Bar options={options} data={barData} />
              </div>
              <div className="">
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Percentage Interaction</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(% of video they were "using" their hands)</p>
                <Line options={options} data={pctInt} />
              </div>
              <div className="">
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Number of Interactions</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(per hour)</p>
                <Line options={options} data={numInt} />
              </div>
              <div className="">
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Average Interaction Duration</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(seconds)</p>
                <Line options={options} data={avgInt} />
              </div>
              <div className=""> 
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Activity Breakdown</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(ADL Category)</p>
                <div className="w-[80%]">
                  <Doughnut options={options} data={adlCats} />
                </div>
              </div>
              <div className="">
                <h1 className="inline text-lg font-medium mb-4 ml-4 text-slate-500">Video Snippets</h1>
                <p className='inline text-sm ml-1 text-slate-400'>(click to view)</p>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
