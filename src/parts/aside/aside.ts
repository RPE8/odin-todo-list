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
			<li class="project-menu__add>Add Project<li>
			<li class="project-menu__add-form add-form>
				<input placeholder="Project name" class="add-form__title"></input>
				<button class="add-form__add">Add</button>
				<button class="add-form__cancel">Cancel</button>
			</li>
		</menu>
	</aside>`;

	container.innerHTML = html;
	return container;
}