/* eslint-disable no-case-declarations */
import { Reducer } from 'react';
import { ADD_STAT, AddStatAction, addStat } from './action';

export type IStat = {
	workTime: number;
	pauseTime: number;
	pomodoros: number;
	counterPause: number;
	createDate: Date;
};

export type MeState = {
	Monday: IStat;
	Tuesday: IStat;
	Wednesday: IStat;
	Thursday: IStat;
	Friday: IStat;
	Saturday: IStat;
	Sunday: IStat;
};

export interface StatisticsState {
	stat: IStat[]
}

export const statisticsReducer: Reducer<StatisticsState, AddStatAction> = (state, action) => {
	switch (action.type) {
		case ADD_STAT:
			return {
                ...state,
                stat: addStat(state, action.task),
            };
		default:
			return state;
	}
};
