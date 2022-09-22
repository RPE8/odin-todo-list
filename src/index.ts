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
	debugger;
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
    syncTasks();
    formTask.reset();
  } catch (err) {
    alert(err);
  }
};

const handleTaskCancelPress = (): void => {
  clearTaskInputs();
};

const handleTaskEditPress = (event: Event): void => {
	const button = event.currentTarget as HTMLButtonElement;
	const parent = button.parentElement;
	const editElement = parent!.nextElementSibling;
	parent?.classList.add("invisible");
	editElement?.classList.remove("invisible");
};

const handleTaskEditSavePress = (event: Event): void => {
	debugger
	console.log("save")
	event.preventDefault();
	const button = event.currentTarget as HTMLButtonElement;
	const parent = button!.parentElement!.parentElement;
	const displayElement = parent!.previousElementSibling;
	parent?.classList.add("invisible");
	displayElement?.classList.remove("invisible");
}
const handleTaskEditCancelPress = (event: Event): void => {
	console.log("cancel")
	event.preventDefault();
	debugger;
	const button = event.currentTarget as HTMLButtonElement;
	const parent = button!.parentElement!.parentElement;
	const displayElement = parent!.previousElementSibling;
	parent?.classList.add("invisible");
	displayElement?.classList.remove("invisible");
}

const clearTaskInputs = (): void => {
  if (formTaskTitleInput) formTaskTitleInput.value = '';
  if (formTaskDescriptionInput) formTaskDescriptionInput.value = '';
  if (formTaskDateStartInput) formTaskDateStartInput.value = '';
};

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

const formTask = document.querySelector('.main__add-form') as HTMLFormElement;
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
