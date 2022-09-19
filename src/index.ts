import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {renderTasklist as renderTasks} from "./parts/main/main";
import {renderToolbar, renderProjects} from "./parts/aside/aside";
import {addProject, getProjects, findProject, removeProject, isValidProject} from "./modules/project";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader(), renderTasks([]), renderToolbar([]));
	body.append(content);
}

render();

const sycnProjects = () => {
	renderProjects(getProjects());
	const projectRemoveBtns = Array.from(document.querySelectorAll(`.project-menu__projects-list > [data-id]`)) as HTMLLIElement[];
	projectRemoveBtns.forEach(item => {
		item.addEventListener("click", handleProjectPress);
		item.querySelector(".project__remove")?.addEventListener("click", handleRemovePress);
	});
}

const handleRemovePress = (event: Event) => {
	event.stopPropagation();
	const currentTarget = event.currentTarget as HTMLButtonElement;
	const parent = currentTarget.parentElement as HTMLLIElement;
	const id = parent.dataset.id;
	if (id) {
		removeProject(id);
		sycnProjects();
	}
}

const handleProjectPress = (event: Event) => {
	const {target, currentTarget} = event;
	console.log("display tasks");
}

const handleProjectAddPress = () => {
	const title = formAddTitle?.value;
	if (!title) return;
	const project = {
		id: title,
		title: title,
		description: "",
		tasks: [],
	};

	if (!isValidProject(project)) return;

	addProject(project);
	sycnProjects();
}

const handleProjectCancelPress = () => {
	if (formAddTitle) formAddTitle.value = "";
}

const formAddBtn = document.querySelector(".add-form__add");
const formCancelBtn = document.querySelector(".add-form__cancel") ;
const formAddTitle = document.querySelector(".add-form__title") as HTMLInputElement;

formAddBtn?.addEventListener("click", handleProjectAddPress);
formCancelBtn?.addEventListener("click", handleProjectCancelPress);