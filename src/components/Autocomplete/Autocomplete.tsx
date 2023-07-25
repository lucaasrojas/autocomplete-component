import React from "react";
import "./Autocomplete.css";
import { Film, asyncFilter, top100Films } from "../../api";

const Autocomplete = () => {
	const [filteredList, setFilteredList] = React.useState<Film[]>(top100Films);
	const [inputValue, setInputValue] = React.useState<string | undefined>(
		undefined
	);

	const handleOnChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		const query = ev.target.value;
		setInputValue(query);

		const value = await asyncFilter(query);

		setFilteredList(value);
	};

	const highlightText = (text: String, toHighlight: string) => {
		// It should take in count the capitalization but I am not sure how to do it
		const parts = text.split(toHighlight);
		return (
			<>
				{parts[0]}
				<span style={{ background: "yellow" }}>{toHighlight}</span>
				{parts[1]}
			</>
		);
	};

	return (
		<div className="autocomplete">
			<input
				className="autocomplete-input"
				value={inputValue}
				onChange={(ev) => handleOnChange(ev)}
			></input>
			<div className="options-list">
				<ul>
					{filteredList.map((el: Film) => (
						<li onClick={() => setInputValue(el.label)}>
							{inputValue ? highlightText(el.label, inputValue) : el.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Autocomplete;
