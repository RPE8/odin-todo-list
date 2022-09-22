import {
  TTask,
  TTaskId,
  isValidTask,
  validationFields as taskValidationFields
} from './task';
import { copyObj } from '../utils';

export const minTitleLength = 0;
export const maxTitleLength = 20;

export type TProject = {
  id: TProjectId;
  title: string;
  description: string;
  tasks: TTask[];
};

export type TProjectId = string;

type TValidationFields = 'id' | 'title' | 'description';

type TEntityFinder<T, TFields extends keyof T> = (
  lookUp4: Partial<Pick<T, TFields>>,
  lookUpIn?: T[]
) => T[];

type TProjectAdder = (project: TProject | TProject[]) => TProject[];
type TProjectsGetter = () => TProject[];
type TProjectFinder = TEntityFinder<TProject, TValidationFields>;
type TProjectRemover = (project: TProject | TProjectId) => TProject[];
type TTaskAdder = (project: Readonly<TProject>, task: TTask) => TProject;
type TProjectUpdater = (project: TProject) => TProject[];
type TProjectValidator = (project: TProject) => boolean;
type TProjectsTaskValidator = (project: TProject, task: TTask) => boolean;
type TProjectsTaskFinder = TEntityFinder<TTask, TValidationFields>;
type TProjectsTaskReplacer = (
  taskReplaceBy: TTask,
  taskToBeReplaced: Partial<TTask>,
  tasksReplaceIn: TTask[]
) => boolean;
type TProjectTaskRemover = (
  project: TProject,
  task: TTaskId | TTask
) => TProject;

let projects: TProject[] = [];
const validationFields: TValidationFields[] = ['id', 'title', 'description'];

const isProject = (
  project: TProject & Record<string, unknown>
): project is TProject => {
  return project && validationFields.every((field) => field in project);
};

export const addProject: TProjectAdder = (project) => {
  let projects2Add: TProject[];
  if (!Array.isArray(project)) {
    projects2Add = [project];
  } else {
    projects2Add = [...project];
  }

  projects = [
    ...copyObj(projects),
    ...projects2Add.filter((project) => isProject(project))
  ];

  return projects;
};

export const removeProject: TProjectRemover = (project) => {
  if (typeof project === 'string') {
    projects = copyObj(projects).filter((prj: TProject) => prj.id !== project);
  } else {
    projects = copyObj(projects).filter(
      (prj: TProject) => prj.id !== project.id
    );
  }

  return projects;
};

export const getProjects: TProjectsGetter = () => {
  return projects;
};

export const findProject: TProjectFinder = (projectLook4) => {
  if (!projectLook4) return [];
  return projects.filter((project) => {
    for (let i = 0; i < validationFields.length; i++) {
      if (validationFields[i] in projectLook4) {
        if (
          projectLook4[validationFields[i] as TValidationFields] !==
          project[validationFields[i] as TValidationFields]
        ) {
          return false;
        }
      }
    }
    return true;
  });
};

export const findTask: TProjectsTaskFinder = (taskLook4, tasks) => {
  if (!Array.isArray(tasks)) return [];
  if (!taskLook4) return [];

  return tasks.filter((task) => {
    for (let i = 0; i < taskValidationFields.length; i++) {
      if (taskValidationFields[i] in taskLook4) {
        if (
          taskLook4[validationFields[i] as TValidationFields] !==
          task[validationFields[i] as TValidationFields]
        ) {
          return false;
        }
      }
    }
    return true;
  });
};

export const replaceTask: TProjectsTaskReplacer = (
  taskReplaceBy,
  taskToBeReplaced,
  tasksReplaceIn
) => {
  if (!Array.isArray(tasksReplaceIn)) return false;
  if (!taskReplaceBy) return false;
  if (!taskToBeReplaced) return false;

  for (let i = 0; i < tasksReplaceIn.length; i++) {
    let validationFieldsExist = 0;
    let validationFieldsEqual = 0;
    for (let j = 0; j < taskValidationFields.length; j++) {
      if (taskValidationFields[j] in taskToBeReplaced) {
        validationFieldsExist++;
        if (
          taskToBeReplaced[validationFields[j] as TValidationFields] !==
          tasksReplaceIn[i][validationFields[j] as TValidationFields]
        ) {
          break;
        }

        validationFieldsEqual++;
      }
    }
    if (
      validationFieldsExist !== 0 &&
      validationFieldsEqual === validationFieldsExist
    ) {
      tasksReplaceIn[i] = taskReplaceBy;
      return true;
    }
  }

  return false;
};

export const addTask2Project: TTaskAdder = (project, task) => {
  if (!validateTaskWithinProject(project, task)) {
    throw new Error('not a valid task');
  }

  project.tasks.push(task);
  return project;
};

export const updateProject: TProjectUpdater = (project) => {
  const replaceIndex = projects.findIndex(
    (projectCopy) => projectCopy.id === project.id
  );
  if (replaceIndex === -1) {
    throw new Error('no such project exists');
  }

  projects[replaceIndex] = project;
  return projects;
};

export const isValidProject: TProjectValidator = (project) => {
  const trimedTitle = project.title.trim();
  return (
    isProject(project) &&
    trimedTitle.length > minTitleLength &&
    trimedTitle.length < maxTitleLength &&
    findProject(project).length === 0
  );
};

export const validateTaskWithinProject: TProjectsTaskValidator = (
  project,
  task
) => {
  if (
    !isProject(project) ||
    !isValidTask(task) ||
    findTask(task, project.tasks).length
  )
    return false;
  return true;
};

export const removeTaskFromProject: TProjectTaskRemover = (project, task) => {
  const taskId = typeof task === 'string' ? task : task.id;
  project.tasks = project.tasks.filter((task) => task.id !== taskId);
  return project;
};
