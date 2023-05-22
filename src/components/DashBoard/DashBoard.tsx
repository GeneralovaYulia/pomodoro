import React from 'react';
import styles from './dashboard.module.css';
import { DayCard } from '../DayCard';
import { TomatoCounter } from '../TomatoCounter';
import { CardFocus } from '../CardFocus';
import { CardPause } from '../CardPause';
import { CardStop } from '../CardStop';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { BarChart } from '../BarChart';

Chart.register(CategoryScale);

interface IDashBoard {
	workTime: number;
	actualDate: number;
	pauseTime: number;
	counterPause: number;
	pomodoros: number;
}

export function DashBoard({
	workTime,
	actualDate,
	pauseTime,
	counterPause,
	pomodoros,
}: IDashBoard) {
	return (
		<>
			<div className={styles.dashBoard}>
				<div className={styles.dashBoard_top}>
					<div>
						<DayCard workTime={workTime} actualDate={actualDate} />
						<TomatoCounter pomodoros={pomodoros} />
					</div>
					<BarChart />
				</div>
				<div className={styles.dashBoart_data}>
					<CardFocus pauseTime={pauseTime} workTime={workTime} />
					<CardPause pauseTime={pauseTime} />
					<CardStop counterPause={counterPause} />
				</div>
			</div>
		</>
	);
}
