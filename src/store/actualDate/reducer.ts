import { Reducer } from 'redux';
import { ACTUAL_DATE, ActualDateAction } from './action';

export interface ActualDateState {
    actualDate: string;
}

const actualDateState: ActualDateState = {
    actualDate: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
};

export const actualDateReducer: Reducer<ActualDateState, ActualDateAction> = (state = actualDateState, action) => {
	switch (action.type) {
		case ACTUAL_DATE:
			return {
				...state,
				actualDate: action.task,
			};
		default:
			return state;
	}
};
