import React from "react";
import "./Autocomplete.css";
import { Film, asyncFilter, top100Films } from "../../api";

const Autocomplete = () => {
	const [filteredList, setFilteredList] = React.useState<Film[]>(top100Films);
	const [inputValue, setInputValue] = React.useState<string>("");
	const handleOnChange = async (ev: any) => {
		const query = ev.target.value;
		setInputValue(query);
		const value = await asyncFilter(query);
		console.log("value", value);
		setFilteredList(value);
	};
	return (
		<div className="autocomplete">
			<input
				className="autocomplete-input"
				value={inputValue}
				onChange={(ev) => handleOnChange(ev)}
			/>
			<div className="options-list">
				<ul>
					{filteredList.map((el: Film) => (
						<li onClick={() => setInputValue(el.label)}>{el.label}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Autocomplete;
