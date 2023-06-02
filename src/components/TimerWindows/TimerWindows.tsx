import React from 'react';
import styles from './timerwindows.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ITask } from '../../store/actualTimer/reducer';
import { WorkTimer } from '../Timers/WorkTimer';
import { PauseTimer } from '../Timers/PauseTimer';

export function TimerWindows() {
	const timerCurrent = useSelector<RootState, ITask>(
		(state) => state.actualTimer.actualTimer
	);

	const timer = useSelector<RootState, string>(
		(state) => state.timerType.timerType
	);

	if (timerCurrent.id === '') return null;

	return (
		<>
			{timer === 'WorkTimer' && <WorkTimer />}
			{timer === 'PauseTimer' && <PauseTimer />}
		</>
	);
}
