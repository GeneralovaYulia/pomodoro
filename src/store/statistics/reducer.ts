/* eslint-disable no-case-declarations */
import { Reducer } from 'react';
import { ADD_STAT, AddStatAction } from './action';

export type IStat = {
	workTime: number;
	pauseTime: number;
	pomodoros: number;
	counterPause: number;
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
	stat: {
		[key in
		| 'Sunday'
		| 'Monday'
		| 'Tuesday'
		| 'Wednesday'
		| 'Thursday'
		| 'Friday'
		| 'Saturday']: {
			workTime: 0;
			pauseTime: 0;
			pomodoros: 0;
			counterPause: 0;
		};
	};
}

export const statisticsReducer: Reducer<StatisticsState, AddStatAction> = (state, action) => {
	switch (action.type) {
		case ADD_STAT:
			const date = new Date();
			const daysOfWeek = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			];
			const dayOfWeekIndex = date.getDay();
			const day = daysOfWeek[dayOfWeekIndex] as keyof MeState;

			if (state.stat[day] === undefined) {
				const newState = {
					...state,
					stat: {
						...state.stat,
						[day]: {
							workTime: action.task.workTime,
							pauseTime: action.task.pauseTime,
							pomodoros: action.task.pomodoros,
							counterPause: action.task.counterPause,
						},
					},
				};

				localStorage.setItem('statistics', JSON.stringify(newState.stat));
				return newState;
			} else {
				const newState = {
					...state,
					stat: {
						...state.stat,
						[day]: {
							workTime:
								state.stat[day].workTime + action.task.workTime,
							pauseTime:
								state.stat[day].pauseTime + action.task.pauseTime,
							pomodoros:
								state.stat[day].pomodoros + action.task.pomodoros,
							counterPause:
								state.stat[day].counterPause + action.task.counterPause,
						},
					},
				};
				localStorage.setItem('statistics', JSON.stringify(newState.stat));
				return newState;
			}
		default:
			return state;
	}
};
