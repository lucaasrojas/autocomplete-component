import React from "react";
import "./Autocomplete.css";
import { Film, asyncFilter, top100Films } from "../../api";

const Autocomplete = () => {
	const [filteredList, setFilteredList] = React.useState<Film[]>(top100Films);
	const [inputValue, setInputValue] = React.useState<string | undefined>(
		undefined
	);
	const [selectedValue, setSelectedValue] = React.useState<string | undefined>()
	const [showOptionList, setShowOptionList] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState(false)

	const handleOnChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true)
		if(selectedValue) setSelectedValue("")
		const query = ev.target.value;
		setInputValue(query);

		const value = await asyncFilter(query);

		setFilteredList(value);
		setLoading(false)
	};

	const highlightText = (text: String, toHighlight: string) => {
		const splitIndex = text.toLowerCase().indexOf(toHighlight.toLowerCase())
		const before = text.substring(0,splitIndex)
		const highlight = text.substring(splitIndex, splitIndex + toHighlight.length)
		const after = text.substring((splitIndex + toHighlight.length))
		return (
			<>
				{before}
				<span style={{ background: "yellow" }}>{highlight}</span>
				{after}
			</>
		);
	};

	const handleSelectOption = async (el:any) => {
		setShowOptionList(false)
		setInputValue("")
		setSelectedValue(el.label)
		setFilteredList(await asyncFilter(""))
	}
	return (
		<div className="autocomplete">
			<input
				className="autocomplete-input"
				value={selectedValue || inputValue}
				onChange={(ev) => handleOnChange(ev)}
				onFocus={() => setShowOptionList(true)}
			></input>
			{loading && (<span>Loading...</span>)}
			{
				showOptionList && (
					<div className="options-list">
						<ul>
							{filteredList.length > 0 ? filteredList.map((el: Film) => (
								<li onClick={() => handleSelectOption(el)}>
									{inputValue ? highlightText(el.label, inputValue) : el.label}
								</li>
							)) : <li>No results found</li>}
						</ul>
					</div>
				)
			}

		</div>
	);
};

export default Autocomplete;
