import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Nav from "./Nav";
import Reports from "./Reports";
import { SearchIcon } from "@heroicons/react/solid";

const Dashboard = () => {
  const { user } = UserAuth();
  const [patients, setPatients] = useState([]); // get patients from firestore
  const [current, setCurrent] = useState(null); // selected patient for view reports
  const [searchTerm, setSearchTerm] = useState(""); // filter by search bar

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "patients"),
        where("show", "==", `${user.uid}`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPatients((patients) => [...patients, doc]);
      });
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    current ? console.log(current) : console.log("no patient selected");
  }, [current]);

  return (
    <div>
      <Nav />

      <div className='py-10'>
        <header>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold leading-tight text-slate-900 inline'>
              Dashboard
            </h1>
            <p className='inline ml-1 text-slate-400'>Beta.</p>
            <p className='font-light text-sm text-slate-500 text-justify mt-1'>
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
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
              <div className='mt-8 flex flex-col'>
                <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <input
                        type='text'
                        name='search'
                        id='search'
                        className='focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mb-4'
                        placeholder='Search by patient or therapist name'
                        autoComplete='off'
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </div>
                    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-300'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                              Patient Name
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                              Diagnosis
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                              Location
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                              Therapist
                            </th>
                            <th
                              scope='col'
                              className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                              <span className='sr-only'>View</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                          {patients
                            .filter((value) => {
                              if (searchTerm === "") {
                                return value;
                              } else if (
                                value
                                  .data()
                                  .name.toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return value;
                              } else if (
                                value
                                  .data()
                                  .therapist.toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return value;
                              }
                            })
                            .map((patient, index) => (
                              <tr key={index}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                  {patient.data().name}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {patient.data().dx}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {patient.data().location}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {patient.data().therapist}
                                </td>
                                <td className='whitespace-nowrap py-4 pr-4 pl-4 sm:pr-6'>
                                  <button
                                    type='button'
                                    onClick={() => setCurrent(patient)}
                                    className='w-[75%] justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
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
