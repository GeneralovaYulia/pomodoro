import { Reducer } from 'redux';
import { ACTUAL_BAR, ActualBarAction } from './action';

export type IStat = {
	workTime: number;
	pauseTime: number;
	pomodoros: number;
	counterPause: number;
	createDate: Date;
};

export interface ActualBarState {
    actualBar: IStat;
}

const actualDateState: ActualBarState = {
	actualBar: {
		workTime: 0,
		pauseTime: 0,
		pomodoros: 0,
		counterPause: 0,
		createDate: new Date(),
	}
};

export const actualBarReducer: Reducer<ActualBarState, ActualBarAction> = (state = actualDateState, action) => {
	switch (action.type) {
		case ACTUAL_BAR:
			return {
				...state,
				actualBar: action.task,
			};
		default:
			return state;
	}
};
