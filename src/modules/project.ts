type TProject = {
	title: string,
	description: string,
	date: string,
}

type TProjectAdder = (project: TProject | TProject[]) => TProject[];
type TProjectGetter = () => TProject[];
type TProjectFinder = (lookUp4: Partial<Omit<TProject, "tasks">>) => TProject[]; 
type TIsProject = (project: TProject) => project is TProject;
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
			if (lookUp4[keys[i] as keyof TProject] !== project[keys[i] as keyof TProject]) {
				return false;
			}
		}
		return true;
	});
}