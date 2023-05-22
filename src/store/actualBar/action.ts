import { ActionCreator } from 'redux';
import { IStat } from './reducer';

export const ACTUAL_BAR = 'ACTUAL_BAR';
export type ActualBarAction = {
	type: typeof ACTUAL_BAR;
	task: IStat;
};

export const actualBarAction: ActionCreator<ActualBarAction> = (task) => ({
	type: ACTUAL_BAR,
	task,
});

