import React, { useRef } from "react";
import "./Autocomplete.css";
import { Film, asyncFilter, top100Films } from "../../api";
import useClickOutside from "../../hooks/useClickOutside";

const Autocomplete = () => {
	const [filteredList, setFilteredList] = React.useState<Film[]>(top100Films);
	const [inputValue, setInputValue] = React.useState<string | undefined>("");
	const [selectedValue, setSelectedValue] = React.useState<string | undefined>()
	const [showOptionList, setShowOptionList] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState(false)
	const autoRef = useRef<any>()

	useClickOutside(showOptionList, autoRef, setShowOptionList)

	const handleOnChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		let timer;
		setLoading(true)
		if (timer) clearTimeout(timer)
		if (inputValue && !showOptionList) setShowOptionList(true)
		if (selectedValue) setSelectedValue("")
		const query = ev.target.value;
		setInputValue(query);
		timer = setTimeout(async () => {
			asyncFilter(query).then((newList) => {
				setFilteredList(newList)
				setLoading(false)
			})

		}, 300)

	};

	const highlightText = (text: string, toHighlight: string) => {
		if (text.toLowerCase().includes(toHighlight.toLowerCase())) {

			const splitIndex = text.toLowerCase().indexOf(toHighlight.toLowerCase())
			const before = text.substring(0, splitIndex)
			const highlight = text.substring(splitIndex, splitIndex + toHighlight.length)
			const after = text.substring((splitIndex + toHighlight.length))
			return (
				<>
					{before}
					<span style={{ background: "yellow" }}>{highlight}</span>
					{after}
				</>
			);
		} else return <></>
	};

	const handleSelectOption = (el: Film) => {
		setShowOptionList(false)
		setInputValue("")
		setSelectedValue(el.label)
		asyncFilter("").then((newList) => setFilteredList(newList))
	}
	return (
		<div className="autocomplete" >
			<input
				className="autocomplete-input"
				value={selectedValue || inputValue}
				onChange={(ev) => handleOnChange(ev)}
				onFocus={() => setShowOptionList(true)}
				ref={autoRef}
			></input>
			{loading && (<span>Loading...</span>)}
			{
				showOptionList && (
					<div className="options-list">
						<ul>
							{filteredList.length > 0 ? filteredList.map((el: Film, i: number) => (
								<li className="option" key={`option-${i}`} onClick={() => handleSelectOption(el)}>
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
