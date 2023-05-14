import React, { useState } from 'react';
import styles from './timer.module.css';
import { RootState } from '../../../store/rootReducer';
import { IconPlusButtonTime } from '../../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITask, ITimer } from '../../../store/actualTimer/reducer';
import { useTimerFunctions } from '../../../hooks/useTimerFunctions';
import { handleStartTimerFunction } from '../../../hooks/handleStartTimerFunction';
import { handleStopTimerFunction } from '../../../hooks/handleStopTimerFunction';
import { handleIncrementTimerFunction } from '../../../hooks/handleIncrementTimer';

export function Timer({ startTime, timerStatus, nameTitle }: ITimer) {
	const timerCurrent = useSelector<RootState, ITask>(
		(state) => state.actualTimer.actualTimer
	);

	const dispatch = useDispatch();
	const [timeLeft, setTimeLeft] = useState(startTime);
	const [workTime, setWorkTime] = useState(startTime);
	const [pauseTime, setPauseTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [counterPause, setCounterPause] = useState(0);
	const [pomodoro, setPomodoro] = useState(0);
	const status = timerStatus;

	useTimerFunctions({
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

	return (
		<>
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
			<div className={styles.titleTask}>Задача - {nameTitle}</div>
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
		</>
	);
}
