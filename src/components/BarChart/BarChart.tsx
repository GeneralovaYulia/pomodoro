import React from 'react';
import styles from './barchart.module.css';
import {
	Chart,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	InteractionModeFunction,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { IStat, StatisticsState } from '../../store/statistics/reducer';
import { actualBarAction } from '../../store/actualBar/action';
import { getActualPeriod } from '../../hooks/getActualPeriod';
import getTimeForChart from '../../hooks/getTimeForChart';

declare module 'chart.js' {
	interface InteractionModeMap {
		myCustomMode: InteractionModeFunction;
	}
}

export function BarChart() {
	const stat = useSelector<RootState, StatisticsState>(
		(state) => state.statisticsState
	);
	const actualPeriod = useSelector<RootState, string>(
		(state) => state.actualPeriod.actualPeriod
	);
	const activeBar = useSelector<RootState, IStat>(
		(state) => state.actualBar.actualBar
	);

	const dispatch = useDispatch();
	const data = getActualPeriod({ stat, actualPeriod, activeBar });
	const chartRef = useRef<any>();

	Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

	const barChartData = {
		labels: data.labels,
		datasets: [
			{
				data: data.array,
				label: 'workTime',
				backgroundColor: data.colorsBars,
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
						return getTimeForChart(
							value as number,
							' мин',
							' сек',
							' '
						);
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
					color: data.colorsXlabels,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
		},
		onClick: (event: any): void => {
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
					const actualBar = data.weekArray[index];
					dispatch(actualBarAction(actualBar));
				}
			}
		},
	};

	return (
		<div className={styles.chartContainer} ref={chartRef}>
			<Bar ref={chartRef} data={barChartData} options={options} />
		</div>
	);
}
