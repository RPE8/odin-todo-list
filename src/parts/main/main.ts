import './main.css';
import {
  TTask,
  minTitleLength,
  maxTitleLength,
  minDescriptionLength,
  maxDescriptionLength
} from '../../modules/task';
import {format, isValid} from 'date-fns'
import { createElement } from '../../utils';

const container = createElement('div', [
  'main__container',
  'container'
]) as HTMLDivElement;

export const renderTasklist = (tasks: TTask[]): typeof container => {
  return render(tasks);
};

export const render = (tasks: TTask[]): typeof container => {
  const html = `<main class="main">
		<h2 class="main__title">Tasks</h2>
		<ul class="main__task-list task-list">
			${prepareTasksListHTML(tasks)}
		</ul>
		<button class="main__add-task add-task">Add task</button>
		<div class="main__add-form add-form">
			<input maxlength="${maxTitleLength}" minlength="${minTitleLength}" placeholder="Task name" class="add-form__title"></input>
			<input maxlength="${maxDescriptionLength}" minlength="${minDescriptionLength}" placeholder="Task description" class="add-form__description"></input>
			<div>		
				<label for="add-form__date-start">Start date:</label>
				<input type="date" id="add-form__date-start" class="add-form__date-start date-start" name="trip-start">
			</div>
			<div>	
				<button class="add-form__add">Add</button>
				<button class="add-form__cancel">Cancel</button>
			</div>
		</div>
	</main>`;

  container.innerHTML = html;
  return container;
};

const prepareTasksListHTML = (tasks: TTask[]): string => {
  const html = '<li></li>';
  return html;
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
	debugger;
	const date = new Date(task.date);
	
  const html = `<li class="task-list__task task" data-id="${task.id}">
		<span class="task__title">${task.title}</span>
		<span class="description">${task.description}</span>
		<span class="description">${isValid(date) ? format(date, "dd MM yyyy") : ""}</span>
		<button class="task__remove">
			<span class="material-icons header__logo md-24">list_alt</span>
		</button>
	</li>`;
  return html;
};
