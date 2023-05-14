import React from 'react';
import styles from './cardpause.module.css';
import { IconCardPause } from '../Icons';

interface ICardPause {
	pauseTime: number;
}

export function CardPause({ pauseTime }: ICardPause) {
	const headerStyles =
		pauseTime !== 0 ? styles.cardPauseActive : styles.cardPause;
	const color = pauseTime !== 0 ? '#9C97D7' : '#C4C4C4';
	const minutes = Math.floor(pauseTime / 60);

	return (
		<div className={headerStyles}>
			<div>
				<h2 className={styles.cardPause_title}>Время на паузе</h2>
				<span className={styles.cardPause_percent}>{minutes}м</span>
			</div>
			<IconCardPause color={color} />
		</div>
	);
}
