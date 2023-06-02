import React from 'react';
import styles from './cardpause.module.css';
import { IconCardPause } from '../Icons';

interface ICardPause {
	pauseTime: number;
}

export function CardPause({ pauseTime }: ICardPause) {
	return (
		<div className={pauseTime !== 0 ? styles.cardPauseActive : styles.cardPause}>
			<div>
				<h2 className={styles.cardPause_title}>Время на паузе</h2>
				<span className={styles.cardPause_percent}>{Math.floor(pauseTime / 60)}м</span>
			</div>
			<IconCardPause color={pauseTime !== 0 ? '#9C97D7' : '#C4C4C4'} />
		</div>
	);
}
