import "./aside.css";
import {createElement} from "../utils";

export const render = () => {
	const container = createElement("div", ["aside__container", "container"])
	const html = `<aside class="aside">
	</aside>`;

	container.innerHTML = html;
	return container;
}