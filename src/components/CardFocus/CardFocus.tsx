import React from 'react';
import styles from './cardfocus.module.css';
import { IconCardFocus } from '../Icons';

interface ICardFocus {
	pauseTime: number;
	workTime: number;
}

export function CardFocus({ pauseTime, workTime }: ICardFocus) {
	let effectProcent;
	if (workTime === 0 && pauseTime === 0) {
		effectProcent = 0;
	} else {
		effectProcent = (workTime / (workTime + pauseTime)) * 100;
	}

	const procent = Math.floor(effectProcent);
	const headerStyles =
		workTime !== 0 ? styles.cardFocusActive : styles.cardFocus;
	const color = workTime !== 0 ? '#FFAE35' : '#C4C4C4';

	return (
		<div className={headerStyles}>
			<div>
				<h2 className={styles.cardFocus_title}>Фокус</h2>
				<span className={styles.cardFocus_percent}>{procent}%</span>
			</div>
			<IconCardFocus color={color} />
		</div>
	);
}
