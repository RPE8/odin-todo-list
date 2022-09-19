export type TTask = {
	id: string,
	title: string,
	description: string,
	date: string,
} 

export type TValidationFields = "id" | "title" | "description" | "date";
export const validationFields: TValidationFields[] = ["id", "title", "description", "date"];

type TTaskValidator = (task: TTask) => boolean; 

export const isTask = (task: TTask): task is TTask => {
	return validationFields.every(field => field in task);
}

export const isValidTask: TTaskValidator = (task) => {
	const trimedTitle = task.title.trim();
	return isTask(task) && trimedTitle.length > 0 && trimedTitle.length < 20;
}