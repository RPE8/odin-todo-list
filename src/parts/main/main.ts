import "./main.css";
import {createElement} from "../../utils";

export const render = () => {
	const container = createElement("div", ["main__container", "container"])
	const html = `<main class="main">
	</main>`;

	container.innerHTML = html;
	return container;
}