import { Reducer } from 'redux';
import { TIMER_TYPE, TimerTypeAction } from './action';

export interface TimerTypeState {
    timerType: string
}

const timerTypeState: TimerTypeState = {
    timerType: 'WorkTimer',
};

export const timerTypeReducer: Reducer<TimerTypeState, TimerTypeAction> = (state = timerTypeState, action) => {
	switch (action.type) {
		case TIMER_TYPE:
			return {
				...state,
				timerType: action.timerType,
			};
		default:
			return state;
	}
};