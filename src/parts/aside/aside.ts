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
		<menu class="aside__main-menu main-menu menu">
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
};

const prepareProjectsHTML = (projects: TProject[]): string => {
  return projects.map(prepareProjectHTML).join('');
};

const prepareProjectHTML = (project: TProject): string => {
  const html = `<li class="project-list__project project" data-id="${project.id}">
		<span class="material-icons header__logo md-24">list_alt</span>
		<span>${project.title}</span>
		<button class="project__remove remove">
			<span class="material-icons material-symbols-outlined header__logo md-24">close</span>
		</button>
	</li>`;
  return html;
};

const preparePorjectsMenuContentHTML = (projects: TProject[]): string => {
  return `
	<div class="project-menu__add-form add-form">
		<input maxlength="${maxTitleLength}" minlength="${minTitleLength}" placeholder="Project name" class="add-form__title"></input>
		<button class="add-form__add">Add</button>
		<button class="add-form__cancel">Cancel</button>
	</div>
	<ul class="project-menu__projects-list menu">${prepareProjectsHTML(
    projects
  )}</ul>`;
};

export const renderProjects = (projects: TProject[]): void => {
  const projectsMenu = document.querySelector('.project-menu__projects-list');
  if (!projectsMenu) return;

  projectsMenu.innerHTML = prepareProjectsHTML(projects);
};
