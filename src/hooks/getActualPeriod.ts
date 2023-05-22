import { StatisticsState } from "../store/statistics/reducer";

interface IGetActualPeriod {
    stat: StatisticsState,
    actualPeriod: string,
}

export const getActualPeriod = ({stat, actualPeriod}: IGetActualPeriod) => {
    const days = 14;

	let week = new Date().getDate() - days + 1;

	const newArr = stat.stat.filter(
		(el) => new Date(el.createDate).getDate() >= week
	);
	const weekArray = [];
	for (let i = 0; i < days; i++) {
		const currentEl = newArr.find(
			(el) => new Date(el.createDate).getDate() === week
		);
		weekArray[i] = currentEl
			? currentEl
			: {
					createDate: ``,
					workTime: 0,
					pauseTime: 0,
					counterPause: 0,
					pomodoros: 0,
			};
		week++;
	}

	let now = new Date();
	const time = now.getTime();
	now = new Date(time);

	const arr = [];

	for (let i = 0; i < days; i++, now.setDate(now.getDate() - 1)) {
		arr.push(new Date(now.getTime()).toISOString());
	}

	arr.sort();

	for (let i = 0; i < weekArray.length; i++) {
		weekArray[i].createDate = arr[i];
	}

	if (actualPeriod === 'thisWeek') {
		weekArray.splice(0, 7)
	}

	if (actualPeriod === 'lastWeek') {
		weekArray.splice(7, 7)
	}

	const labels = [];

	for (let i = 0; i < weekArray.length; i++) {
		if (new Date(weekArray[i].createDate).getDay() === 0) {labels.push('Вс')}
		if (new Date(weekArray[i].createDate).getDay() === 1) {labels.push('Пн')}
		if (new Date(weekArray[i].createDate).getDay() === 2) {labels.push('Вт')}
		if (new Date(weekArray[i].createDate).getDay() === 3) {labels.push('Ср')}
		if (new Date(weekArray[i].createDate).getDay() === 4) {labels.push('Чт')}
		if (new Date(weekArray[i].createDate).getDay() === 5) {labels.push('Пт')}
		if (new Date(weekArray[i].createDate).getDay() === 6) {labels.push('Сб')}
	}

	const array = [];

	for (let i = 0; i < weekArray.length; i++) {
		array[i] = weekArray[i].workTime
	}

    return {
        weekArray,
        labels,
        array
    }
}