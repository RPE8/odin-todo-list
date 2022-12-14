import './aside.css';
import {
	TProject,
	minTitleLength,
	maxTitleLength
} from '../../modules/project';
import { createElement } from '../../utils';

const container: HTMLElement = createElement('div', [
	'aside__container',
	'container'
]);

export const renderToolbar = (projects: TProject[]): typeof container => {
	return render(projects);
};

const render = (projects: TProject[] = []): typeof container => {
	container.replaceChildren();
	const html = `<aside class="aside">
		<h3 class="aside__projects-title projects-title">Projects</h3>
		<form class="aside__project-form project-form add-form">
			<input required data-formPart='project-title' maxlength="${maxTitleLength}" minlength="${minTitleLength}" placeholder="Project name" class="project-form__title"></input>
			<button class="project-form__add">Add</button>
			<button class="project-form__clear">Clear Form</button>
		</form>
		<menu class="aside__projects-menu projects-menu menu">
			${preparePorjectsMenuContentHTML(projects)}
		</menu>
	</aside>`;

	container.innerHTML = html;
	return container;
};

const prepareProjectsHTML = (projects: TProject[]): string => {
	return projects.map(prepareProjectHTML).join('');
};

const prepareProjectHTML = (project: TProject): string => {
	const html = `<li class="project-list__project project" data-id="${project.id}">
		<div class="project__display-wrapper">
			<div class="project__project-data" data-id="${project.id}">
				<span class="material-icons header__logo md-24">list_alt</span>
				<span>${project.title}</span>
			</div>
			<button data-id="${project.id}" class="project__edit project__button edit">
					<span class="material-icons header__logo md-24">edit</span>
			</button>
			<button data-id="${project.id}" class="project__remove project__button remove">
				<span class="material-icons material-symbols-outlined md-24">close</span>
			</button>
		</div>
		<form class="project__project-form project-form project-edit project__edit-wrapper invisible">
			<input required data-formPart='project-title' maxlength="${maxTitleLength}" minlength="${minTitleLength}" placeholder="Project name" class="project-form__title" value="${project.title}"></input>
			<button data-id="${project.id}" class="project-form__save">Save</button>
			<button data-id="${project.id}" class="project-form__cancel">Cancel</button>
		</form>
	</li>`;
	return html;
};

const preparePorjectsMenuContentHTML = (projects: TProject[]): string => {
	return `
	<ul class="project-menu__projects-list menu">${prepareProjectsHTML(
		projects
	)}</ul>`;
};

export const renderProjects = (projects: TProject[]): void => {
	const projectsMenu = document.querySelector('.project-menu__projects-list');
	if (!projectsMenu) return;

	projectsMenu.innerHTML = prepareProjectsHTML(projects);
};
