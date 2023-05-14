import React from 'react';
import styles from './statpage.module.css';
import { Container } from 'react-bootstrap';
import { Header } from '../Header';
import { Select } from '../Select';
import { DashBoard } from '../DashBoard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {MeState, StatisticsState} from '../../store/statistics/reducer';

export function StatPage() {
	const stat = useSelector<RootState, StatisticsState>((state) => state.statisticsState);
	const actualDate = useSelector<RootState, string>((state) => state.actualDate.actualDate) as keyof MeState;

	let workTime: number, pauseTime: number, pomodoros, counterPause;

	if (stat.stat[actualDate] === undefined) {
		workTime = 0;
		pauseTime = 0;
		pomodoros = 0;
		counterPause = 0;
	} else {
		workTime = stat.stat[actualDate].workTime;
		pauseTime = stat.stat[actualDate].pauseTime;
		pomodoros = stat.stat[actualDate].pomodoros;
		counterPause = stat.stat[actualDate].counterPause;
	}

	return (
		<>
			<Header />
			<main>
				<Container>
					<div className={styles.DashDoard}>
						<div className={styles.DashBoard_choice}>
							<h1 className={styles.DashBoard_title}>
								Ваша активность
							</h1>
							<Select />
						</div>
						<DashBoard
							pomodoros={pomodoros}
							workTime={workTime}
							actualDate={actualDate}
							pauseTime={pauseTime}
							counterPause={counterPause}
						/>
					</div>
				</Container>
			</main>
		</>
	);
}
