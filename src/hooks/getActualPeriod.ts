import { IStat, StatisticsState } from "../store/statistics/reducer";

interface IGetActualPeriod {
	stat: StatisticsState,
	actualPeriod: string,
	activeBar: IStat,
}

export const getActualPeriod = ({ stat, actualPeriod, activeBar }: IGetActualPeriod) => {
	const days = 14;
	const date = new Date();
	const now = new Date(date.getTime());
	const weekArray = [];

	for (let i = 0; i < days; i++, now.setDate(now.getDate() - 1)) {
		const dateCopy = new Date();
		dateCopy.setDate(date.getDate() - days + 1 + i);
		const currentDay = dateCopy.getDate();

		const currentEl = stat.stat.find(
			(el) => new Date(el.createDate).getDate() === currentDay
		);
		weekArray[i] = currentEl
			? currentEl
			: {
				createDate: new Date(dateCopy).toISOString(),
				workTime: 0,
				pauseTime: 0,
				counterPause: 0,
				pomodoros: 0,
			};
	}

	if (actualPeriod === 'thisWeek') {
		weekArray.splice(0, 7)
	}

	if (actualPeriod === 'lastWeek') {
		weekArray.splice(7, 7)
	}

	const labels = [];

	for (let i = 0; i < weekArray.length; i++) {
		if (new Date(weekArray[i].createDate).getDay() === 0) { labels.push('Вс') }
		if (new Date(weekArray[i].createDate).getDay() === 1) { labels.push('Пн') }
		if (new Date(weekArray[i].createDate).getDay() === 2) { labels.push('Вт') }
		if (new Date(weekArray[i].createDate).getDay() === 3) { labels.push('Ср') }
		if (new Date(weekArray[i].createDate).getDay() === 4) { labels.push('Чт') }
		if (new Date(weekArray[i].createDate).getDay() === 5) { labels.push('Пт') }
		if (new Date(weekArray[i].createDate).getDay() === 6) { labels.push('Сб') }
	}

	const array = [];

	for (let i = 0; i < weekArray.length; i++) {
		array[i] = weekArray[i].workTime
	}

	const colorsBars = [];
	const colorsXlabels = [];

	for (let i = 0; i < weekArray.length; i++) {
		if (weekArray[i].createDate === activeBar.createDate) {
			colorsBars.push("#DC3E22");
			colorsXlabels.push("#DC3E22");
		} else {
			colorsBars.push("#EA8A79");
			colorsXlabels.push("#999999");
		}
	}

	return {
		weekArray,
		labels,
		array,
		colorsBars,
		colorsXlabels
	}
}