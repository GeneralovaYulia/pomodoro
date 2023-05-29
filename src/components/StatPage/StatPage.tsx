import React from 'react';
import styles from './statpage.module.css';
import { Container } from 'react-bootstrap';
import { Header } from '../Header';
import { Selection } from '../Select';
import { DashBoard } from '../DashBoard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { IStat, StatisticsState } from '../../store/statistics/reducer';

interface IStatPage {
	onClick: () => void;
}

export function StatPage({onClick}: IStatPage) {
	const stat = useSelector<RootState, StatisticsState>(
		(state) => state.statisticsState
	);
	const actualBar = useSelector<RootState, IStat>(
		(state) => state.actualBar.actualBar
	);
	let workTime: number, pauseTime: number, pomodoros, counterPause;
	const date = new Date().getDay();
	let indexActualDate = date;

	if (stat.stat.length === 0) {
		workTime = 0;
		pauseTime = 0;
		pomodoros = 0;
		counterPause = 0;
	} else {
		workTime = actualBar.workTime;
		pauseTime = actualBar.pauseTime;
		pomodoros = actualBar.pomodoros;
		counterPause = actualBar.counterPause;
		indexActualDate = new Date(actualBar.createDate).getDay();
	}

	return (
		<>
			<Header onClick={onClick} />
			<main>
				<Container>
					<div className={styles.DashDoard}>
						<div className={styles.DashBoard_choice}>
							<h1 className={styles.DashBoard_title}>
								Ваша активность
							</h1>
							<Selection />
						</div>
						<DashBoard
							pomodoros={pomodoros}
							workTime={workTime}
							actualDate={indexActualDate}
							pauseTime={pauseTime}
							counterPause={counterPause}
						/>
					</div>
				</Container>
			</main>
		</>
	);
}
