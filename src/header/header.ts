import "./header.css";
import {createIcon, createElement} from "../utils";

export const render = () => {
	const header = createElement("header", [], ["id", "header"]);

	const container = createElement("div", ["header__container", "container"]);
	const logo = createIcon("list_alt", "md-36");

	container.append(logo);
	header.append(container);
	return header;
}