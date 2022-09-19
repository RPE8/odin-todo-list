import {TTask, isTask} from "./task";
import {copyObj} from "../utils";

export type TProject = {
	id: TProjectId,
	title: string,
	description: string,
	tasks: TTask[]
}

type TProjectId = string;

type TValidationFields = "id" | "title" | "description";

type TProjectAdder = (project: TProject | TProject[]) => TProject[];
type TProjectsGetter = () => TProject[];
type TProjectFieldsToCompare = Pick<TProject, TValidationFields>;
type TProjectFinder = (lookUp4: Partial<TProjectFieldsToCompare>) => TProject[]; 
type TProjectRemover = (project: TProject | TProjectId) => TProject[];
type TTaskAdder = (project: Readonly<TProject>, task: TTask) => TProject; 
type TProjectValidator = (project: TProject) => boolean;

let projects: TProject[] = [];
const validationFields: TValidationFields[] = ["id", "title", "description"];

const isProject = (project: TProject): project is TProject => {
	return project && "id" in project && "title" in project && "description" in project && "tasks" in project;
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

export const findProject:TProjectFinder = (lookUp4) => {
	return projects.filter(project => {
		for (let i = 0; i < validationFields.length; i++) {
			if (validationFields[i] in lookUp4) {
				if (lookUp4[validationFields[i] as keyof TProjectFieldsToCompare] !== project[validationFields[i] as keyof TProjectFieldsToCompare]) {
					return false;
				}
			}
		}
		return true;
	});
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