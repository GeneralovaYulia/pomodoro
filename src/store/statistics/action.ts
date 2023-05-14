import { ActionCreator } from 'redux';
import { IStat } from './reducer';

export const ADD_STAT = 'ADD_STAT';
export type AddStatAction = {
	type: typeof ADD_STAT;
	task: IStat;
};

export const addStatTask: ActionCreator<AddStatAction> = (task) => ({
	type: ADD_STAT,
	task,
});