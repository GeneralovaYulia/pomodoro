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
import { actualDate } from '../../store/actualDate/action';

export function BarChart() {
	const stat = useSelector<RootState, StatisticsState>(
		(state) => state.statisticsState
	);
	const dispatch = useDispatch();
	const data = stat.stat;

	Chart.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const dataWorkTime = [
		data.Monday ? data.Monday.workTime : 0,
		data.Tuesday ? data.Tuesday.workTime : 0,
		data.Wednesday ? data.Wednesday.workTime : 0,
		data.Thursday ? data.Thursday.workTime : 0,
		data.Friday ? data.Friday.workTime : 0,
		data.Saturday ? data.Saturday.workTime : 0,
		data.Sunday ? data.Sunday.workTime : 0,
	];

	const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const barChartData = {
		labels,
		datasets: [
			{
				data: dataWorkTime,
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
			const index = clickedElements[0].index;
			const daysOfWeek = [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			];
			const day = daysOfWeek[index];

			dispatch(actualDate(day));
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
