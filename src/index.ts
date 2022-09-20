import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {renderTasklist, renderTasks} from "./parts/main/main";
import {renderToolbar, renderProjects} from "./parts/aside/aside";
import {addProject, getProjects, findProject, removeProject, isValidProject, TProjectId, TProject} from "./modules/project";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader(), renderTasklist([]), renderToolbar([]));
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
	const id = parent.dataset.id as TProjectId;
	if (id) {
		removeProject(id);
		sycnProjects();
	}
}

const handleProjectPress = (event: Event) => {
	const currentTarget = event.currentTarget as HTMLLIElement;
	const id = currentTarget.dataset.id as TProjectId;
	const project = findProject({id})[0];
	renderTasks(project.tasks);
	selectedProject = project;
	console.log(project?.tasks);
	console.log("display tasks");
}

const handleProjectAddPress = () => {
	const title = formProjectTitleInput?.value;
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
	if (formProjectTitleInput) formProjectTitleInput.value = "";
}

const handleTaskAddPress = () => {
		console.log(selectedProject);
}

let selectedProject: TProject;

const formProjectAddButton = document.querySelector(".project-menu__add-form .add-form__add");
const formProjectCancelButton = document.querySelector(".project-menu__add-form .add-form__cancel") ;
const formProjectTitleInput = document.querySelector(".project-menu__add-form .add-form__title") as HTMLInputElement;

const taskAddButton = document.querySelector(".main__add-task.add-task");
const formTaskAddButton = document.querySelector(".main__add-form .add-form__add") ;
const formTaskCancelButton = document.querySelector(".main__add-form .add-form__cancel") ;
const formTaskTitleInput = document.querySelector(".main__add-form .add-form__title") as HTMLInputElement;
const formTaskDescriptionInput = document.querySelector(".main__add-form .add-form__description") as HTMLInputElement;

console.log(taskAddButton, formTaskAddButton, formTaskCancelButton, formTaskTitleInput, formTaskDescriptionInput);

formProjectAddButton?.addEventListener("click", handleProjectAddPress);
formProjectCancelButton?.addEventListener("click", handleProjectCancelPress);
formTaskAddButton?.addEventListener("click", handleTaskAddPress);

addProject({title: "1", description: "2", id: "3", tasks: [{id: "1", title: "2", date: "", description: ""}]});
sycnProjects();
