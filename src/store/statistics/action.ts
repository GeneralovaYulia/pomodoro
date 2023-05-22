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

export function addStat(state: { stat: IStat[]; }, task: IStat) {
	const stat = state.stat;
	const date = new Date().getDate();
	const statEl = stat.find((el) => new Date(el.createDate).getDate() === date);
	
	if (statEl === undefined) {
		stat.push(task);
		localStorage.setItem('statistics', JSON.stringify(stat));

		return stat;
	} else {
		const index = stat.findIndex((el) => new Date(el.createDate).getDate() === date);
		stat[index].counterPause = stat[index].counterPause + task.counterPause;
		stat[index].pauseTime = stat[index].pauseTime + task.pauseTime;
		stat[index].pomodoros = stat[index].pomodoros + task.pomodoros;
		stat[index].workTime = stat[index].workTime + task.workTime;
		localStorage.setItem('statistics', JSON.stringify(stat));

		return stat;
	}
}