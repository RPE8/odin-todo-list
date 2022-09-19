import "./main.css";
import {TTask} from "../../modules/task";
import {createElement} from "../../utils";

const container = createElement("div", ["main__container", "container"])

export const renderTasklist = (tasks: TTask[]): typeof container => {
	return render(tasks);
}

export const render = (tasks: TTask[]): typeof container => {
	
	const html = `<main class="main">
		<h2 class="main__title">Tasks</h2>
		<ul class="main__task-list task-list">
			${prepareTasksListHTML(tasks)}
		</ul>
		<div class="main__add-form add-form">
			<input placeholder="Task name" class="add-form__title"></input>
			<input placeholder="Task description" class="add-form__description"></input>
			<button class="add-form__add">Add</button>
			<button class="add-form__cancel">Cancel</button>
		</div>
	</main>`;

	container.innerHTML = html;
	return container;
}

const prepareTasksListHTML = (tasks: TTask[]): string => {
	const html = "<li></li>";
	return html;
}