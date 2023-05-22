import { ActionCreator } from 'redux';

export const ACTUAL_PERIOD = 'ACTUAL_PERIOD';
export type ActualPeriodAction = {
	type: typeof ACTUAL_PERIOD;
	task: string;
};

export const actualPeriodAction: ActionCreator<ActualPeriodAction> = (task) => ({
	type: ACTUAL_PERIOD,
	task,
});