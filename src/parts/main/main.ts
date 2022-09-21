import './main.css';
import {
  TTask,
  minTitleLength,
  maxTitleLength,
  minDescriptionLength,
  maxDescriptionLength
} from '../../modules/task';
import { TProject } from '../../modules/project';
import { format, isValid } from 'date-fns';
import { createElement } from '../../utils';

const container = createElement('div', [
  'main__container',
  'container'
]) as HTMLDivElement;

export const renderTasklist = (tasks: TTask[]): typeof container => {
  return render(tasks);
};

export const render = (
  tasks: TTask[],
  project?: TProject
): typeof container => {
  const html = `<main class="main">
		<div class="main__selected-project-container">
			<h2 class="main__selected-project-title">${createProjectTitle(
        project?.title
      )}</h3>
		</div>
		
		<div class="main__add-form add-form invisible">
			<input maxlength="${maxTitleLength}" minlength="${minTitleLength}" placeholder="Task name" class="add-form__title"></input>
			<input maxlength="${maxDescriptionLength}" minlength="${minDescriptionLength}" placeholder="Task description" class="add-form__description"></input>
			<div>		
				<label for="add-form__date-start">Start date:</label>
				<input type="date" id="add-form__date-start" class="add-form__date-start date-start" name="trip-start">
			</div>
			<div>	
				<button class="add-form__add">Add Task</button>
				<button class="add-form__cancel">Clear Form</button>
			</div>
		</div>
		<ul class="main__task-list task-list">
			${prepareTasksListHTML(tasks)}
		</ul>
	</main>`;

  container.innerHTML = html;
  return container;
};

const prepareTasksListHTML = (tasks: TTask[]): string => {
  const html = '<li></li>';
  return html;
};

export const renderProjectTasksPart = (
  project: TProject,
  tasks: TTask[]
): void => {
  renderSelectedProject(project);
  renderTasks(tasks);
  const taskAddForm = document.querySelector('.main__add-form');
  if (!project) {
    taskAddForm?.classList.add('invisible');
  } else {
    taskAddForm?.classList.remove('invisible');
  }
};

export const renderSelectedProject = (project: TProject): void => {
  const selectedProjectTitle = document.querySelector(
    '.main__selected-project-title'
  );
  if (project && selectedProjectTitle) {
    selectedProjectTitle.textContent = createProjectTitle(project.title);
  }
};

export const renderTasks = (tasks: TTask[]): void => {
  const tasksList = document.querySelector('.main__task-list');
  if (!tasksList) return;

  tasksList.innerHTML = prepareTasksHTML(tasks);
};

const prepareTasksHTML = (tasks: TTask[]): string => {
  return tasks.map(prepareTaskHTML).join('');
};

const prepareTaskHTML = (task: TTask): string => {
  const date = new Date(task.date);

  const html = `<li class="task-list__task task" data-id="${task.id}">
		<span class="task__title">${task.title}</span>
		<span class="description">${task.description}</span>
		<span class="date">${isValid(date) ? format(date, 'dd MM yyyy') : ''}</span>
		<button class="task__remove remove">
			<span class="material-icons header__logo md-24">close</span>
		</button>
	</li>`;
  return html;
};

const createProjectTitle = (title: unknown): string => {
  if (typeof title === 'string') return `Project: ${title}`;
  return `Please, select project`;
};
