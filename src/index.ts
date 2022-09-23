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
  removeTaskFromProject,
  replaceTask,
	findTask
} from './modules/project';
import { TTaskId, TTask } from './modules/task';
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

  const tasksEditBtns = Array.from(
    document.querySelectorAll(`.task-list .task__edit`)
  ) as HTMLLIElement[];
  tasksEditBtns.forEach((item) => {
    item.addEventListener('click', handleTaskEditPress);
  });

  const tasksEditSaveBtns = Array.from(
    document.querySelectorAll(`.task-list .task__save`)
  ) as HTMLLIElement[];
  tasksEditSaveBtns.forEach((item) => {
    item.addEventListener('click', handleTaskEditSavePress);
  });

  const tasksEditCancelBtns = Array.from(
    document.querySelectorAll(`.task-list .task__cancel`)
  ) as HTMLLIElement[];
  tasksEditCancelBtns.forEach((item) => {
    item.addEventListener('click', handleTaskEditCancelPress);
  });
};

const handleTaskRemovePress = (event: Event): void => {
  const currentTarget = event.currentTarget as HTMLButtonElement;
  if (!currentTarget) return;
  const parent = currentTarget.parentElement!.parentElement as HTMLLIElement;
  const id = parent.dataset.id as TTaskId;
  if (id) {
    removeTaskFromProject(selectedProject, id);
    syncTasks();
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
  syncTasks();
};

const handleProjectAddPress = (event: SubmitEvent): void => {
  try {
    event.preventDefault();
    const validity = formProject.checkValidity();
    formProject.reportValidity();
    const title = formProjectTitleInput?.value;
    if (!validity) return;
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
    alert(err);
  }
};

const handleProjectCancelPress = (): void => {
  clearProjectInputs();
};

const clearProjectInputs = (): void => {
  if (formProjectTitleInput) formProjectTitleInput.value = '';
};

const handleTaskAddPress = (event: SubmitEvent): void => {
  event.preventDefault();
  const task = prepareAndValidateTaskOnSave(newTaskForm);
  if (!task) {
    return;
  }

  try {
    addTask2Project(selectedProject, task);
    syncTasks();
    newTaskForm.reset();
  } catch (err) {
    alert(err);
  }
};

const prepareAndValidateTaskOnSave = (form: HTMLFormElement): TTask | false => {
  try {
    const validity = form.checkValidity();
    form.reportValidity();
    const title = (
      form.querySelector("[data-formPart='task-title']") as HTMLInputElement
    ).value;
    const description = (
      form.querySelector(
        "[data-formPart='task-description']"
      ) as HTMLInputElement
    ).value;
    const date = (
      form.querySelector("[data-formPart='task-date']") as HTMLInputElement
    ).value;
    if (!validity) return false;
    const task = {
      id: title,
      title: title,
      description: description,
      date: date
    };
    return task;
  } catch (err) {
    alert(err);
    return false;
  }
};

const handleTaskCancelPress = (event: Event): void => {
	event.preventDefault();
	newTaskForm.reset();
};

const getIdFromAttributes = (
  element: HTMLElement
): TTaskId | TProjectId | undefined => {
  return element?.dataset?.id;
};

const getDisplayWrapperByTaskId = (id: TTaskId): HTMLDivElement | undefined => {
  return document.querySelector(
    `.task[data-id="${id}"] .task__display-wrapper`
  ) as HTMLDivElement | undefined;
};
const getEditWrapperByTaskId = (id: TTaskId): HTMLFormElement | undefined => {
  return document.querySelector(
    `.task[data-id="${id}"] .task__edit-wrapper`
  ) as HTMLFormElement | undefined;
};

const handleTaskEditPress = (event: Event): void => {
  const button = event.currentTarget as HTMLButtonElement;
  const id = getIdFromAttributes(button) as TTaskId;
  const editWrapper = getEditWrapperByTaskId(id);
  const displayWrapper = getDisplayWrapperByTaskId(id);
  if (editWrapper) editWrapper.classList.remove('invisible');
  if (displayWrapper) displayWrapper.classList.add('invisible');
};

const handleTaskEditSavePress = (event: Event): void => {
  event.preventDefault();

  const button = event.currentTarget as HTMLButtonElement;
  const id = getIdFromAttributes(button) as TTaskId;
  const taskEditForm = getEditWrapperByTaskId(id);
  if (!taskEditForm) return;

  const task = prepareAndValidateTaskOnSave(taskEditForm);
  if (!task) {
    return;
  }
  const project = findProject({ id: selectedProject.id })[0];
  if (replaceTask(task, { id }, project.tasks)) {
    syncTasks();
    taskEditForm.reset();
  }

  disableTaskEdit(id);
};

const handleTaskEditCancelPress = (event: Event): void => {
  event.preventDefault();
  const button = event.currentTarget as HTMLButtonElement;
  const id = getIdFromAttributes(button) as TTaskId;
	const form = getEditWrapperByTaskId(id);
	const task = findTask({id}, selectedProject.tasks)[0];
  disableTaskEdit(id);
	if (task && form) setTaskFormData(task, form);
};


const disableTaskEdit = (id: TTaskId): void => {
  const editWrapper = getEditWrapperByTaskId(id);
  const displayWrapper = getDisplayWrapperByTaskId(id);
  if (editWrapper) editWrapper.classList.add('invisible');
  if (displayWrapper) displayWrapper.classList.remove('invisible');
};

const setTaskFormData = (task: TTask, form: HTMLFormElement): void => {
	const titleInput = form.querySelector(".task-form__title") as HTMLInputElement;
	const descriptionInput = form.querySelector(".task-form__description") as HTMLInputElement;
	const dateInput = form.querySelector(".task-form__date-start") as HTMLInputElement;

	titleInput!.value = task.title;
	descriptionInput!.value = task.description;
	dateInput!.value = task.date;
}

const handleDateStartChange = (): void => {};

let selectedProject: TProject = {
  title: '1',
  description: '1',
  id: '1',
  tasks: [
    {
      id: 'aaaaaaaaaaaaaaa',
      title: 'aaaaaaaaaaaaaaa',
      date: '2022-02-02',
      description: 'aaaaaaaaaaaaaaa'
    }
  ]
};

const formProject = document.querySelector(
  '.project-menu__add-form'
) as HTMLFormElement;
const formProjectAddButton = document.querySelector(
  '.project-menu__add-form .add-form__add'
) as HTMLButtonElement;
const formProjectCancelButton = document.querySelector(
  '.project-menu__add-form .add-form__cancel'
) as HTMLButtonElement;
const formProjectTitleInput = document.querySelector(
  '.project-menu__add-form .add-form__title'
) as HTMLInputElement;

const newTaskForm = document.querySelector(
  '.main__task-form'
) as HTMLFormElement;
const newTaskFormAddButton = document.querySelector(
  '.main__task-form .task-form__add'
) as HTMLButtonElement;
const newTaskFormCancelButton = document.querySelector(
  '.main__task-form .task-form__cancel'
) as HTMLButtonElement;

formProjectAddButton?.addEventListener('click', handleProjectAddPress);
formProjectCancelButton?.addEventListener('click', handleProjectCancelPress);
newTaskFormAddButton?.addEventListener('click', handleTaskAddPress);
newTaskFormCancelButton?.addEventListener('click', handleTaskCancelPress);

addProject({
  title: '1',
  description: '1',
  id: '1',
  tasks: [
    {
      id: 'aaaaaaaaaaaaaaa',
      title: 'aaaaaaaaaaaaaaa',
      date: '2022-02-02',
      description: 'aaaaaaaaaaaaaaa'
    }
  ]
});
addProject({
  title: '2',
  description: '2',
  id: '2',
  tasks: [{ id: '2', title: '2', date: '', description: '' }]
});
syncProjects();
syncTasks();

selectedProject = getProjects()[0];
