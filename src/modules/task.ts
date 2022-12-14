export const minTitleLength = 0;
export const maxTitleLength = 20;
export const minDescriptionLength = 0;
export const maxDescriptionLength = 20;

import { format, isValid } from 'date-fns';

export type TTask = {
	id: TTaskId;
	title: string;
	description: string;
	date: string;
};

export type TTaskId = string;

export type TValidationFields = 'id' | 'title' | 'description' | 'date';
export const validationFields: TValidationFields[] = [
	'id',
	'title',
	'description',
	'date'
];

type TTaskValidator = (task: TTask) => boolean;

export const isTask = (
	task: TTask & Record<string, unknown>
): task is TTask => {
	return validationFields.every((field) => field in task);
};

export const isValidTask: TTaskValidator = (task) => {
	if (!task) return false;
	if (!isValid(new Date(task.date))) return false;
	const trimedTitle = task.title.trim();
	return (
		isTask(task) &&
		trimedTitle.length > minTitleLength &&
		trimedTitle.length < maxTitleLength
	);
};
