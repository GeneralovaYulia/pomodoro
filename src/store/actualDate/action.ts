import { ActionCreator } from 'redux';

export const ACTUAL_DATE = 'ACTUAL_DATE';
export type ActualDateAction = {
	type: typeof ACTUAL_DATE;
	task: string;
};

export const actualDate: ActionCreator<ActualDateAction> = (task) => ({
	type: ACTUAL_DATE,
	task,
});