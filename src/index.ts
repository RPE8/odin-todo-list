import './index.css';
import { render as renderHeader } from './parts/header/header';
import { renderTasklist, renderProjectTasksPart } from './parts/main/main';
import { renderToolbar, renderProjects } from './parts/aside/aside';
import {
  addProject,
  getProjects,
  findProject,
  removeProject,
  isValidProject,
  addTask2Project,
  TProjectId,
  TProject,
  removeTaskFromProject
} from './modules/project';
import { TTaskId } from './modules/task';
import { createElement } from './utils';

const body = document.querySelector('body');

function render(): void {
  if (!body) throw new Error('err');

  const content = createElement('div', 'content');
  content.append(renderHeader(), renderTasklist([]), renderToolbar([]));
  body.append(content);
}

render();

const syncProjects = (): void => {
  renderProjects(getProjects());
  const projectRemoveBtns = Array.from(
    document.querySelectorAll(`.project-menu__projects-list > [data-id]`)
  ) as HTMLLIElement[];
  projectRemoveBtns.forEach((item) => {
    item.addEventListener('click', handleProjectPress);
    item
      .querySelector('.project__remove')
      ?.addEventListener('click', handleRemovePress);
  });
};

const syncTasks = (): void => {
  if (!selectedProject) return;
  renderProjectTasksPart(selectedProject, selectedProject.tasks);
  const tasksRemoveBtns = Array.from(
    document.querySelectorAll(`.task-list .task__remove`)
  ) as HTMLLIElement[];
  tasksRemoveBtns.forEach((item) => {
    item.addEventListener('click', handleTaskRemovePress);
  });
};

const handleTaskRemovePress = (event: Event): void => {
  const currentTarget = event.currentTarget as HTMLButtonElement;
  if (!currentTarget) return;
  const parent = currentTarget.parentElement as HTMLLIElement;
  const id = parent.dataset.id as TTaskId;
  if (id) {
    removeTaskFromProject(selectedProject, id);
    renderProjectTasksPart(selectedProject, selectedProject.tasks);
  }
};

const handleRemovePress = (event: Event): void => {
  event.stopPropagation();
  const currentTarget = event.currentTarget as HTMLButtonElement;
  const parent = currentTarget.parentElement as HTMLLIElement;
  const id = parent.dataset.id as TProjectId;
  if (id) {
    removeProject(id);
    syncProjects();
  }
};

const handleProjectPress = (event: Event): void => {
  const currentTarget = event.currentTarget as HTMLLIElement;
  const id = currentTarget.dataset.id as TProjectId;
  const project = findProject({ id })[0];
  selectedProject = project;
  renderProjectTasksPart(selectedProject, selectedProject.tasks);
};

const handleProjectAddPress = (event: SubmitEvent): void => {
  try {
		event.preventDefault();
    const title = formProjectTitleInput?.value;
    if (!title) return;
    const project = {
      id: title,
      title: title,
      description: '',
      tasks: []
    };

    if (!isValidProject(project)) return;

    addProject(project);
    syncProjects();
    clearProjectInputs();
  } catch (err) {
    clearTaskInputs();
  }
};

const handleProjectCancelPress = (): void => {
  clearProjectInputs();
};

const clearProjectInputs = (): void => {
  if (formProjectTitleInput) formProjectTitleInput.value = '';
};

const handleTaskAddPress = (event: SubmitEvent): void => {
  try {
		event.preventDefault();
		const validity = formTask.checkValidity();
		formTask.reportValidity();
    const title = formTaskTitleInput?.value;
    const description = formTaskDescriptionInput?.value;
    if (!validity) return;
    const task = {
      id: title,
      title: title,
      description: description,
      date: formTaskDateStartInput.value
    };

    addTask2Project(selectedProject, task);
    renderProjectTasksPart(selectedProject, selectedProject.tasks);
		formTask.reset();
  } catch (err) {
    console.error(err);
    clearTaskInputs();
  }
};

const handleTaskCancelPress = (): void => {
  clearTaskInputs();
};

const clearTaskInputs = (): void => {
  if (formTaskTitleInput) formTaskTitleInput.value = '';
  if (formTaskDescriptionInput) formTaskDescriptionInput.value = '';
  if (formTaskDateStartInput) formTaskDateStartInput.value = '';
};

const handleDateStartChange = (): void => {};

let selectedProject: TProject;

const formProjectAddButton = document.querySelector(
  '.project-menu__add-form .add-form__add'
) as HTMLButtonElement;
const formProjectCancelButton = document.querySelector(
  '.project-menu__add-form .add-form__cancel'
) as HTMLButtonElement;
const formProjectTitleInput = document.querySelector(
  '.project-menu__add-form .add-form__title'
) as HTMLInputElement;

const formTask = document.querySelector(".main__add-form") as HTMLFormElement;
const formTaskAddButton = document.querySelector(
  '.main__add-form .add-form__add'
) as HTMLButtonElement;
const formTaskCancelButton = document.querySelector(
  '.main__add-form .add-form__cancel'
) as HTMLButtonElement;
const formTaskTitleInput = document.querySelector(
  '.main__add-form .add-form__title'
) as HTMLInputElement;
const formTaskDescriptionInput = document.querySelector(
  '.main__add-form .add-form__description'
) as HTMLInputElement;
const formTaskDateStartInput = document.querySelector(
  '#add-form__date-start'
) as HTMLInputElement;


formProjectAddButton?.addEventListener('click', handleProjectAddPress);
formProjectCancelButton?.addEventListener('click', handleProjectCancelPress);
formTaskAddButton?.addEventListener('click', handleTaskAddPress);
formTaskCancelButton?.addEventListener('click', handleTaskCancelPress);
formTaskDateStartInput?.addEventListener('change', handleDateStartChange);

addProject({
  title: '1',
  description: '1',
  id: '1',
  tasks: [{ id: '1', title: '1', date: '', description: '' }]
});
addProject({
  title: '2',
  description: '2',
  id: '2',
  tasks: [{ id: '2', title: '2', date: '', description: '' }]
});
syncProjects();
