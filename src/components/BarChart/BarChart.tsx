import React, { useEffect, useState } from 'react';
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
import getTimeForChart from '../../hooks/getTimeForChart';

export function BarChart() {
	const stat = useSelector<RootState, StatisticsState>(
		(state) => state.statisticsState
	);
	const actualPeriod = useSelector<RootState, string>(
		(state) => state.actualPeriod.actualPeriod
	);
	const dispatch = useDispatch();
	const data = getActualPeriod({ stat, actualPeriod });
	const chartRef = useRef(null);
	const [isIndex, setIsIndex] = useState(0);

	Chart.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	useEffect(() => {
		//console.log(isIndex)
	})

	const barChartData = {
		labels: data.labels,
		datasets: [
			{
				data: data.array,
				label: 'workTime',
				backgroundColor: ['#EA8A79'],
				hoverBackgroundColor: '#DC3E22',
				color: '#DC3E22',
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
					callback: function (value: any) {
						return getTimeForChart(value as number, ' ч', ' мин', ' ');
					},
					stepSize: 25,
					font: {
						size: 12,
					},
					color: '#999999',
				},
			},
			x: {
				ticks: {
					font: {
						size: 24,
					},
					color: '#999999',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
		},
		onClick: (event: any) => {
			if (!chartRef.current) return;
			const chart = Chart.getChart(chartRef.current);

			if (chart) {
				const clickedElements = chart.getElementsAtEventForMode(
					event,
					'nearest',
					{ intersect: true },
					true
				);

				if (clickedElements.length > 0) {
					const index = clickedElements[0].index;
					setIsIndex(index);
					const datasetIndex = clickedElements[0].datasetIndex;
					chart.data.datasets[datasetIndex].backgroundColor =
						'#DC3E22';
					chart.update();
					const actualBar = data.weekArray[index];
					dispatch(actualBarAction(actualBar));
				}
			}
		},
	};

	return (
		<div className={styles.chartContainer} ref={chartRef}>
			<Bar
				ref={chartRef}
				data={barChartData}
				options={options}
			/>
		</div>
	);
}
