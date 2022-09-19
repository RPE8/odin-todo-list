import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {render as renderMain} from "./parts/main/main";
import {renderToolbar, renderProjects} from "./parts/aside/aside";
import {addProject, getProjects} from "./modules/project";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader(), renderMain(), renderToolbar([]));
	body.append(content);
}

render();

const formAddBtn = document.querySelector(".add-form__add");
const formCancelBtn = document.querySelector(".add-form__cancel");

// const addProject = (project) => {

// }

formAddBtn?.addEventListener("click", () => {
	addProject({
		id: "test",
		title: "test",
		description: "test",
		tasks: []
	});
	addProject({
		id: "test2",
		title: "test2",
		description: "test2",
		tasks: []
	});
	renderProjects(getProjects());
})



console.log(getProjects());