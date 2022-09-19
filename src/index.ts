import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {render as renderMain} from "./parts/main/main";
import {renderToolbar, renderProjects} from "./parts/aside/aside";
import {addProject, getProjects, findProject} from "./modules/project";
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

let formAddBtn = document.querySelector(".add-form__add");
let formCancelBtn = document.querySelector(".add-form__cancel");
let formAddTitle = document.querySelector(".add-form__title") as HTMLInputElement;
// const addProject = (project) => {

// }


formAddBtn?.addEventListener("click", () => {
	const title = formAddTitle.value;
	const project = {
		id: title,
		title: title,
		description: "",
		tasks: [],
	};
	const exists = findProject(project).length;
	console.log(exists);
	if (exists) return;

	addProject(project);
	renderProjects(getProjects());
});

formCancelBtn?.addEventListener("click", () => {
	formAddTitle.value = "";
})



console.log(getProjects());