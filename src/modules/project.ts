import {TTask, isTask} from "./task";

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

	projects = [...JSON.parse(JSON.stringify(projects)), ...projects2Add.filter(project => isProject(project))];

	return projects;
}

export const removeProject:TProjectRemover = (project) => {
	
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
	const projectCopy = JSON.parse(JSON.stringify(project));
	projectCopy.push(task);
	return projectCopy;
}