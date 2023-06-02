import React from 'react';
import styles from './cardfocus.module.css';
import { IconCardFocus } from '../Icons';
import { getFocusPercent } from '../../utils/getFocusPercent';

interface ICardFocus {
	pauseTime: number;
	workTime: number;
}

export function CardFocus({ pauseTime, workTime }: ICardFocus) {
	const percent = getFocusPercent(workTime, pauseTime);

	return (
		<div className={workTime !== 0 ? styles.cardFocusActive : styles.cardFocus}>
			<div>
				<h2 className={styles.cardFocus_title}>Фокус</h2>
				<span className={styles.cardFocus_percent}>{percent}%</span>
			</div>
			<IconCardFocus color={workTime !== 0 ? '#FFAE35' : '#C4C4C4'} />
		</div>
	);
}
