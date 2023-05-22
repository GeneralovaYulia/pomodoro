import React from 'react';
import styles from './barchart.module.css';
import {
	Chart,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { StatisticsState } from '../../store/statistics/reducer';
import { actualBarAction } from '../../store/actualBar/action';
import { getActualPeriod } from '../../hooks/getActualPeriod';

export function BarChart() {
	const stat = useSelector<RootState, StatisticsState>(
		(state) => state.statisticsState
	);
	const actualPeriod = useSelector<RootState, string>(
		(state) => state.actualPeriod.actualPeriod
	);
	const dispatch = useDispatch();
	const data = getActualPeriod({ stat, actualPeriod });

	Chart.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const barChartData = {
		labels: data.labels,
		datasets: [
			{
				data: data.array,
				label: 'workTime',
				borderColor: '#EA8A79',
				backgroundColor: '#EA8A79',
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				position: 'right' as const,
				ticks: {
					stepSize: 25,
					font: {
						size: 12,
					},
					color: '#333333',
				},
			},
			x: {
				ticks: {
					font: {
						size: 24,
					},
					color: '#333333',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
				text: 'Chart.js Bar Chart',
			},
		},
	};

	const chartRef = useRef(null);
	const onClick = (event: any) => {
		if (!chartRef.current) return;
		const chart = Chart.getChart(chartRef.current);
		if (chart) {
			const clickedElements = chart.getElementsAtEventForMode(
				event,
				'nearest',
				{ intersect: true },
				true
			);

			if (clickedElements[0]) {
				const index = clickedElements[0].index;
				const actualBar = data.weekArray[index];
				dispatch(actualBarAction(actualBar));
			}
		}
	};

	return (
		<div className={styles.chart_container}>
			<Bar
				ref={chartRef}
				onClick={onClick}
				data={barChartData}
				options={options}
			/>
		</div>
	);
}
