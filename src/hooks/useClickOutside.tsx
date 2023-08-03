import React from "react"

const useClickOutside = (showOptions:boolean, ref:any, onClickOutside:(value:boolean)=>void) => {
    React.useEffect(() => {
		if (showOptions) {
			window.addEventListener("click", (ev) => {
				if (ev.target !== ref.current) {

					onClickOutside(false)
				}
			})
		}
		return () => {
			window.removeEventListener("click", (ev) => {
				if (ev.target && !(ev.target as any).className.includes("option")) {
					onClickOutside(false)
				}
			})
		}
	}, [showOptions])
}

export default useClickOutside