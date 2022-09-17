import "./header.css";
import {createIcon, createElement} from "../utils";

export const render = () => {
	const header = createElement("header", [], ["id", "header"]);

	const container = createElement("div", ["header__container", "container"]);
	const logo = createIcon("list_alt", "md-36", "header__logo");
	const logoText = createElement("span", "header__text");
	logoText.textContent = "Todo List";
	container.append(logo, logoText);
	header.append(container);
	return header;
}