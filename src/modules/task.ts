export type TTask = {
	title: string,
	description: string,
	date: string,
} 

export const isTask = (task: TTask): task is TTask => {
	return task && "title" in task && "description" in task && "date" in task;
}