import React from 'react';
import styles from './timerwindows.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Timer } from './Timer/Timer';
import { ITask } from '../../store/actualTimer/reducer';

export function TimerWindows() {
	const timerCurrent = useSelector<RootState, ITask>((state) => state.actualTimer.actualTimer);

	if (timerCurrent.id === '') return null;

	const headerStyles =
		timerCurrent.timer.timerStatus == 'active'
			? styles.header
			: styles.headerRed;

	return (
		<div>
			<div className={headerStyles}>
				<div className={styles.titleToDo}>{timerCurrent.title}</div>
				<div className={styles.infoToDo}>
					Помидоров {timerCurrent.pomodoro}
				</div>
			</div>
			<div className={styles.screen}>
				<Timer
					startTime={timerCurrent.timer.startTime}
					timerStatus={timerCurrent.timer.timerStatus}
					nameTitle={timerCurrent.title}
				/>
			</div>
		</div>
	);
}
