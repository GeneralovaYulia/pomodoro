import React from 'react';
import styles from './daycard.module.css';
import { getWord } from '../../utils/getWord';

interface IDayCard {
	workTime: number;
	actualDate: number;
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
