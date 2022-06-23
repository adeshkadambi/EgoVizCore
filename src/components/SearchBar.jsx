import React from 'react';
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = (props) => {
	return (
		<div className="mt-1 relative rounded-md shadow-sm">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
			</div>
			<input
				type="text"
				name="search"
				id="search"
				className="focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md mb-4"
				placeholder="Search by patient name, diagnosis, location, or therapist name..."
				autoComplete="off"
				onChange={(e) => {
					props.searchTermSetter(e.target.value);
				}}
			/>
		</div>
	);
};

export default SearchBar;
