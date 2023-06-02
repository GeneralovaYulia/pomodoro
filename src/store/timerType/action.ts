import { ActionCreator } from 'redux';

export const TIMER_TYPE = 'TIMER_TYPE';
export type TimerTypeAction = {
	type: typeof TIMER_TYPE;
	timerType: string;
};

export const timerTypeAction: ActionCreator<TimerTypeAction> = (timerType) => ({
	type: TIMER_TYPE,
	timerType,
});
