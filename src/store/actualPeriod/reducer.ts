import { Reducer } from 'redux';
import { ACTUAL_PERIOD, ActualPeriodAction} from './action';

export interface ActualPeriodState {
    actualPeriod: string;
}

const actualPeriodState: ActualPeriodState = {
	actualPeriod: 'thisWeek',
};

export const actualPeriodReducer: Reducer<ActualPeriodState, ActualPeriodAction> = (state = actualPeriodState, action) => {
	switch (action.type) {
		case ACTUAL_PERIOD:
			return {
				...state,
				actualPeriod: action.task,
			};
		default:
			return state;
	}
};
