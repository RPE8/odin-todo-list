import "./header.css";

export const render = () => {
	const header = document.createElement("header");
	header.classList.add("header");
	return header;
}