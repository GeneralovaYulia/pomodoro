import React from 'react';
import styles from './daycard.module.css';

interface IDayCard {
	workTime: number;
	actualDate: number;
}

function getWord(value: number, words: [string, string, string]) {
	if (
		value === 1 ||
		value === 21 ||
		value === 31 ||
		value === 41 ||
		value === 51
	)
		return words[0];
	if (value > 1 && value < 5) return words[1];
	if (value >= 22 && value < 25) return words[1];
	if (value >= 32 && value < 35) return words[1];
	if (value >= 42 && value < 45) return words[1];
	if (value >= 52 && value < 55) return words[1];

	return words[2];
}

export function DayCard({ workTime, actualDate }: IDayCard) {
	const minutes = Math.floor(workTime / 60);
	const hours = Math.floor(minutes / 60);
	const seconds = minutes % 60;

	const minutsWord = getWord(minutes, ['минута', 'минуты', 'минут']);
	const hoursWord = getWord(hours, ['час', 'часа', 'часов']);
	const secondsWord = getWord(seconds, ['секунда', 'секунды', 'секунд']);

	let describe;
	let time;

	if (workTime === 0) {
		describe = 'Нет данных';
		time = '';
	} else {
		describe = 'Вы работали над задачами в течение ';
		if (hours === 0) {
			time =
				minutes + ' ' + minutsWord + ' ' + seconds + ' ' + secondsWord;
		} else {
			time =
				hours +
				' ' +
				hoursWord +
				' ' +
				minutes +
				' ' +
				minutsWord +
				' ' +
				seconds +
				' ' +
				secondsWord;
		}
	}

	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const day = daysOfWeek[actualDate];

	return (
		<div className={styles.dayCard}>
			<h2 className={styles.dayCard_title}>{day}</h2>
			<p className={styles.dayCard_text}>
				{describe}
				<span className={styles.dayCard_time}>{time}</span>
			</p>
		</div>
	);
}
