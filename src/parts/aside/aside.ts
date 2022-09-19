import "./aside.css";
import {createElement} from "../../utils";

export const render = () => {
	const container = createElement("div", ["aside__container", "container"])
	const html = `<aside class="aside">
		<menu class="aside__main-menu main-menu menu">
			<li>Inbox</li>
			<li>Today</li>
			<li>This Week<li>
		</menu>
		<h3 class="aside__projects-title projects-title">Projects</h3>
		<menu class="aside__projects-menu projects-menu menu" >
			<li>Add Project<li>
		</menu>
	</aside>`;

	container.innerHTML = html;
	return container;
}