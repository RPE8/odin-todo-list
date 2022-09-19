import "./aside.css";
import {TProject} from "../../modules/project";
import {createElement} from "../../utils";

const container = createElement("div", ["aside__container", "container"])

export const renderToolbar = (projects: TProject[]) => {
	return render(projects);
}

const render = (projects: TProject[] = []) => {
	container.replaceChildren();
	const html = `<aside class="aside">
		<menu class="aside__main-menu main-menu menu">
			<li>Inbox</li>
			<li>Today</li>
			<li>This Week<li>
		</menu>
		<h3 class="aside__projects-title projects-title">Projects</h3>
		<menu class="aside__projects-menu projects-menu menu">
			${preparePorjectsMenuContentHTML(projects)}
		</menu>
	</aside>`;

	container.innerHTML = html;
	return container;
}

const prepareProjectsHTML = (projects: TProject[]) => {
	return projects.map(prepareProjectHTML);
}

const prepareProjectHTML = (project: TProject) => {
	const html = `<li data-id="${project.id}">
		<span class="material-icons header__logo md-24">list_alt</span>
		<span>${project.title}</span>
		<span class="material-icons header__logo md-24">list_alt</span>
	</li>` 
	return html;
}

const preparePorjectsMenuContentHTML = (projects: TProject[]) => {
	return `<ul class="project-menu__projects-list menu">${prepareProjectsHTML(projects).join("")}</ul>
	<button class="project-menu__add">Add Project<button>
	<div class="project-menu__add-form add-form">
		<input placeholder="Project name" class="add-form__title"></input>
		<button class="add-form__add">Add</button>
		<button class="add-form__cancel">Cancel</button>
	</div>`
}

export const renderProjects = (projects: TProject[]) => {
	const projectsMenu = document.querySelector(".project-menu__projects-list");
	if (!projectsMenu) return;

	projectsMenu.innerHTML = prepareProjectsHTML(projects).join("");
}

