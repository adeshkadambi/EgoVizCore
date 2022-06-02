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
  defaults,
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
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // TODO: populate page on bar chart click
  // REF: https://react-chartjs-2.js.org/docs/working-with-events/
  // const chartRef = useRef();
  // const onClick = (event) => {
  //   const get = getElementAtEvent(chartRef.current, event);
  //   console.log(get[0].element.$context.dataIndex);
  // }

  defaults.font.family =
    "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif";

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
        borderColor: "#fb7185", // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: pctIntL,
        borderColor: "#38bdf8", //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      },
    ],
  };

  const numInt = {
    labels,
    datasets: [
      {
        label: "Right Hand",
        data: numIntR,
        borderColor: "#fb7185", // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: numIntL,
        borderColor: "#38bdf8", //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      },
    ],
  };

  const avgInt = {
    labels,
    datasets: [
      {
        label: "Right Hand",
        data: avgIntR,
        borderColor: "#fb7185", // rose-400
        backgroundColor: "#f43f5e", // rose-500
      },
      {
        label: "Left Hand",
        data: avgIntL,
        borderColor: "#38bdf8", //sky-400
        backgroundColor: "#0ea5e9", //sky-500
      },
    ],
  };

  const adlCats = {
    labels: adls,
    datasets: [
      {
        label: "Minutes Recorded",
        data: minADL,
        backgroundColor: [
          "#bae6fd", // sky-400
          "#7dd3fc", // teal-400
          "#38bdf8",
          "#0ea5e9",
          "#0284c7",
          "#0369a1",
        ],
        borderColor: [
          "#f8fafc",
          "#f8fafc",
          "#f8fafc",
          "#f8fafc",
          "#f8fafc",
          "#f8fafc",
        ],
        borderWidth: 2,
      },
    ],
  };

  const videos = [
    {
      name: "Cleaning",
      duration: "00:29",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/cleaning.mp4?alt=media&token=752ddd88-b327-4e04-9d81-204630e2b23b",
    },
    {
      name: "Eating 1",
      duration: "00:27",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/eating1.mp4?alt=media&token=76afcbac-588c-4115-a081-228f47f60ca2",
    },
    {
      name: "Eating 2",
      duration: "00:50",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/eating2.mp4?alt=media&token=4c8681e3-f9ba-45ed-aa3e-492bdc555e83",
    },
    {
      name: "Groceries",
      duration: "00:46",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/groceries.mp4?alt=media&token=ad9011c8-a878-4359-bab3-2411dd79e42c",
    },
    {
      name: "Knitting",
      duration: "00:26",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/knitting.mp4?alt=media&token=4d9e44a7-660d-41a9-94b0-49c253b0bbbb",
    },
    {
      name: "Pills",
      duration: "00:41",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/pills.mp4?alt=media&token=ed54e792-8ae9-4545-b96c-edb32143c698",
    },
    {
      name: "Typing",
      duration: "00:39",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/typing.mp4?alt=media&token=723ba4f8-2202-42f6-a9d2-7fe65a6ab7b7",
    },
    {
      name: "Writing",
      duration: "00:34",
      url: "https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/writing.mp4?alt=media&token=51eff6b0-55a7-4caa-b240-55f5a03149b6",
    },
  ];

  return (
    <div>
      <main className='-mt-4'>
        <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6'>
            <div className='border-b border-gray-300'>
              <h1 className='text-2xl font-bold pb-2'>
                {patient.data().name}'s Hand Use Report
              </h1>
            </div>
            <div className='grid grid-cols-2 gap-12 mt-4'>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Minutes Recorded
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (per day)
                  </p>
                </div>
                <Bar options={options} data={barData} />
              </div>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Percentage Interaction
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (how much were they "using" their hands?)
                  </p>
                </div>
                <Line options={options} data={pctInt} />
              </div>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Number of Interactions
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (per hour)
                  </p>
                </div>
                <Line options={options} data={numInt} />
              </div>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Average Interaction Duration
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (seconds)
                  </p>
                </div>
                <Line options={options} data={avgInt} />
              </div>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Activity Breakdown
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (minutes)
                  </p>
                </div>
                <div className='w-[80%]'>
                  <Doughnut options={options} data={adlCats} />
                </div>
              </div>
              <div className=''>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Video Snippets
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (click to view)
                  </p>
                </div>
                <ul className='divide-y divide-gray-200 grid grid-cols-2 gap-8'>
                  {videos.map((video) => (
                    <div key={video.name} className='py-4'>
                      <div className=''>
                        <a
                          href={video.url}
                          className='text-sm font-medium text-gray-900 hover:text-gray-500'>
                          {video.name}
                        </a>
                        <p className='text-sm text-gray-500'>
                          {video.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
              <div className='col-span-2'>
                <div className='mb-4'>
                  <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
                    Hand Posture Usage
                  </h1>
                  <p className='inline text-sm ml-1 text-slate-400'>
                    (highlights from videos)
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div><img src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating.png?alt=media&token=b8aa851c-2c58-4696-82b4-e11f7bf553d8" alt="" /></div>
                  <div><img src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating2.png?alt=media&token=2f006b37-4e40-4357-b1d6-ba7973384d08" alt="" /></div>
                  <div><img src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_eating3.png?alt=media&token=fdfff223-7c26-4128-8243-e289ebc7b47b" alt="" /></div>
                  <div><img src="https://firebasestorage.googleapis.com/v0/b/egocdss.appspot.com/o/img_writing.png?alt=media&token=dcb080cb-c4b0-465f-b58f-887c58cc3568" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
