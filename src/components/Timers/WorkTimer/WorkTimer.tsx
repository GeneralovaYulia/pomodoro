import React, { useEffect, useState } from 'react';
import styles from './worktimer.module.css';
import { RootState } from '../../../store/rootReducer';
import { IconPlusButtonTime } from '../../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITask } from '../../../store/actualTimer/reducer';
import { useTimerFunctions } from '../../../hooks/useTimerFunctions';
import { handleStartTimerFunction } from '../../../hooks/handleStartTimerFunction';
import { handleStopTimerFunction } from '../../../hooks/handleStopTimerFunction';
import { handleIncrementTimerFunction } from '../../../hooks/handleIncrementTimer';

export function WorkTimer() {
	const timerCurrent = useSelector<RootState, ITask>(
		(state) => state.actualTimer.actualTimer
	);	
	
	const timerType = useSelector<RootState, string>((state) => state.timerType.timerType);

	const dispatch = useDispatch();
	const [timeLeft, setTimeLeft] = useState(timerCurrent.timer.startTime);
	const [workTime, setWorkTime] = useState(timerCurrent.timer.startTime);
	const [pauseTime, setPauseTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [counterPause, setCounterPause] = useState(0);
	const [pomodoro, setPomodoro] = useState(0);
	const status = timerCurrent.timer.timerStatus;

	useTimerFunctions({
		timerType,
		status,
		timerOn,
		timeLeft,
		pomodoro,
		workTime,
		pauseTime,
		counterPause,
		setTimerOn,
		setTimeLeft,
		setPomodoro,
		setPauseTime,
	});

	const minutes = Math.floor(timeLeft / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (timeLeft % 60).toString().padStart(2, '0');

	const buttonStyles =
		timerOn || status === 'active'
			? styles.buttonStopRed
			: styles.buttonStop;
	const buttonStartTitle = timerOn
		? 'Пауза'
		: status === 'active'
		? 'Продолжить'
		: 'Старт';
	const timerStyle =
		!timerOn && status === 'active' ? styles.clockRed : styles.clock;
	const buttonStopTitle = timerOn
		? 'Стоп'
		: status === 'active'
		? 'Сделано'
		: 'Стоп';

		const headerStyles =
		timerCurrent.timer.timerStatus == 'active'
			? styles.header
			: styles.headerRed;

	return (
		<>
			<div>
				<div className={headerStyles}>
					<div className={styles.titleToDo}>{timerCurrent.title}</div>
					<div className={styles.infoToDo}>
						Помидор {timerCurrent.pomodoro + 1}
					</div>
				</div>
				<div className={styles.screen}>
					<div className={timerStyle}>
						<span>
							{minutes}:{seconds}
						</span>
						<button
							className={styles.plusButtonTime}
							onClick={() =>
								handleIncrementTimerFunction({
									timeLeft,
									setTimeLeft,
									setWorkTime,
									dispatch,
									timerCurrent,
								})
							}
						>
							<IconPlusButtonTime />
						</button>
					</div>
					<div className={styles.titleTask}>Задача - {timerCurrent.title}</div>
					<div>
						<button
							className={styles.buttonStart}
							onClick={() =>
								handleStartTimerFunction({
									timerOn,
									timeLeft,
									counterPause,
									setTimerOn,
									setCounterPause,
									dispatch,
									timerCurrent,
								})
							}
						>
							{buttonStartTitle}
						</button>
						<button
							className={buttonStyles}
							onClick={() =>
								handleStopTimerFunction({
									timerType,
									status,
									timerOn,
									timeLeft,
									pomodoro,
									workTime,
									pauseTime,
									counterPause,
									setTimeLeft,
									setTimerOn,
									setPauseTime,
									setWorkTime,
									setCounterPause,
									dispatch,
									timerCurrent,
								})
							}
						>
							{buttonStopTitle}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
