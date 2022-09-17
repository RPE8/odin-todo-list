import {TTask, isTask} from "./task";

type TProject = {
	title: string,
	description: string,
	tasks: TTask[]
}

type TProjectAdder = (project: TProject | TProject[]) => TProject[];
type TProjectGetter = () => TProject[];
type TProjectFieldsToCompare = Omit<TProject, "tasks">;
type TProjectFinder = (lookUp4: Partial<TProjectFieldsToCompare>) => TProject[]; 
type TIsProject = (project: TProject) => project is TProject;
type TTaskAdder = (project: Readonly<TProject>, task: TTask) => TProject; 
let projects: TProject[];


const isProject = (project: TProject): project is TProject => {
	return project && "title" in project && "description" in project && "data" in project;
}

export const addProject:TProjectAdder = (project) => {
	let projects2Add: TProject[];
	if (!Array.isArray(project)) {
		projects2Add = [project]
	} else {
		projects2Add = [...project];
	}

	projects = [...projects, ...projects2Add.filter(project => isProject(project))];

	return projects;
}

export const getProjects = () => {
	return projects;
}

export const findProject:TProjectFinder = (lookUp4) => {
	const keys = Object.keys(lookUp4); 
	if (!keys.length) {
		return [];
	}
	return projects.filter(project => {
		for (let i = 0; i < keys.length; i++) {
			if (lookUp4[keys[i] as keyof TProjectFieldsToCompare] !== project[keys[i] as keyof TProjectFieldsToCompare]) {
				return false;
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