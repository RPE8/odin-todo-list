import {TTask, isTask, isValidTask, validationFields as taskValidationFields} from "./task";
import {copyObj} from "../utils";

export type TProject = {
	id: TProjectId,
	title: string,
	description: string,
	tasks: TTask[]
}

type TProjectId = string;

type TValidationFields = "id" | "title" | "description";

type TEntityFinder<T,TFields extends keyof T> = (lookUp4: Partial<Pick<T, TFields>>, lookUpIn?: T[]) => T[];

type TProjectAdder = (project: TProject | TProject[]) => TProject[];
type TProjectsGetter = () => TProject[];
type TProjectFinder = TEntityFinder<TProject, TValidationFields>; 
type TProjectRemover = (project: TProject | TProjectId) => TProject[];
type TTaskAdder = (project: Readonly<TProject>, task: TTask) => TProject; 
type TProjectValidator = (project: TProject) => boolean;
type TProjectsTaskValidator = (project: TProject, task: TTask) => boolean;
type TProjectsTaskFinder = TEntityFinder<TTask, TValidationFields>;

let projects: TProject[] = [];
const validationFields: TValidationFields[] = ["id", "title", "description"];

const isProject = (project: TProject): project is TProject => {
	return validationFields.every(field => field in project);
}

export const addProject:TProjectAdder = (project) => {
	let projects2Add: TProject[];
	if (!Array.isArray(project)) {
		projects2Add = [project]
	} else {
		projects2Add = [...project];
	}

	projects = [...copyObj(projects), ...projects2Add.filter(project => isProject(project))];

	return projects;
}

export const removeProject:TProjectRemover = (project) => {
	if (typeof project === "string") {
		projects = copyObj(projects).filter((prj: TProject) => prj.id !== project);
	} else {
		projects = copyObj(projects).filter((prj: TProject) => prj.id !== project.id);
	}


	return projects;
}

export const getProjects:TProjectsGetter = () => {
	return projects;
}

export const findProject:TProjectFinder = (projectLook4) => {
	if (!projectLook4) return [];
	return projects.filter(project => {
		for (let i = 0; i < validationFields.length; i++) {
			if (validationFields[i] in projectLook4) {
				if (projectLook4[validationFields[i] as TValidationFields] !== project[validationFields[i] as TValidationFields]) {
					return false;
				}
			}
		}
		return true;
	});
}

export const findTask:TProjectsTaskFinder = (taskLook4, tasks) => {
	if (!Array.isArray(tasks)) return [];
	if (!taskLook4) return [];
	
	return tasks.filter(task => {
		for (let i = 0; i < taskValidationFields.length; i++) {
			if (taskValidationFields[i] in taskLook4) {
				if (taskLook4[validationFields[i] as TValidationFields] !== task[validationFields[i] as TValidationFields]) {
					return false;
				}
			}
		}
		return true;
	})
}

export const addTask2Project: TTaskAdder = (project, task) => {
	if (!isTask(task)) {
		throw new Error("not a valid task");
	}
	const projectCopy = copyObj<TProject>(project);
	projectCopy.tasks.push(task);
	return projectCopy;
}

export const isValidProject: TProjectValidator = (project) => {
	const trimedTitle = project.title.trim();
	return isProject(project) && trimedTitle.length > 0 && trimedTitle.length < 20 && findProject(project).length === 0;
}

export const validateTaskWithinProject: TProjectsTaskValidator = (project, task) => {
	if (!isValidTask(task) || findTask(task, project.tasks).length) return false;
	return true;
}