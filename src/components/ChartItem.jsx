import React, { useState } from "react";
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
import { InformationCircleIcon } from "@heroicons/react/outline";

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
    "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif";

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  if (props.type === "bar") {
    const barData = {
      labels: props.labels,
      datasets: [
        {
          label: "Minutes Recorded",
          data: props.data,
          backgroundColor: "#38bdf8",
        },
      ],
    };

    return (
      <div>
        <div className='mb-4'>
          <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
            {props.title}
          </h1>
          <p className='inline text-sm ml-1 text-slate-400'>
            ({props.subtitle})
          </p>
          {props.tooltip ? (
            <div className='tooltip' data-tip={props.tooltip}>
              <InformationCircleIcon
                className='ml-2 w-4 h-4 inline text-slate-500 hover:text-slate-400'
                aria-hidden='true'
                data-tooltip-target='tooltip-default'
              />
            </div>
          ) : null}
        </div>
        <Bar options={options} data={barData} />
      </div>
    );
  } else if (props.type === "line") {
    const lineData = {
      labels: props.labels,
      datasets: [
        {
          label: "Right Hand",
          data: props.dataR,
          borderColor: "#fb7185", // rose-400
          backgroundColor: "#f43f5e", // rose-500
        },
        {
          label: "Left Hand",
          data: props.dataL,
          borderColor: "#38bdf8", //sky-400
          backgroundColor: "#0ea5e9", //sky-500
        },
      ],
    };

    return (
      <div>
        <div className='mb-4'>
          <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
            {props.title}
          </h1>
          <p className='inline text-sm ml-1 text-slate-400'>
            ({props.subtitle})
          </p>
          {props.tooltip ? (
            <div className='tooltip' data-tip={props.tooltip}>
              <InformationCircleIcon
                className='ml-2 w-4 h-4 inline text-slate-500 hover:text-slate-400'
                aria-hidden='true'
                data-tooltip-target='tooltip-default'
              />
            </div>
          ) : null}
        </div>
        <Line options={options} data={lineData} />
      </div>
    );
  } else if (props.type === "pie") {
    const pieData = {
      labels: props.labels,
      datasets: [
        {
          label: "Minutes Recorded",
          data: props.data,
          backgroundColor: [
            "#bae6fd",
            "#7dd3fc",
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

    return (
      <div>
        <div className='mb-4'>
          <h1 className='inline text-lg font-medium mb-4 ml-4 text-slate-500'>
            {props.title}
          </h1>
          <p className='inline text-sm ml-1 text-slate-400'>
            ({props.subtitle})
          </p>
          <button onClick={toggleVisible} className='text-slate-500 hover:text-slate-300'>
            <InformationCircleIcon
              className='ml-6 w-4 h-4 inline'
              aria-hidden='true'
            />
            <span className='text-sm ml-1 inline align-middle'>
              Click for more information
            </span>
          </button>
        </div>
        <div className='w-[80%] h-[80%]'>
          <Doughnut data={pieData} />
        </div>
      </div>
    );
  }
};

export default ChartItem;