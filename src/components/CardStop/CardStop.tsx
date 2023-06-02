import React from 'react';
import styles from './cardstop.module.css';
import { IconCardStop } from '../Icons';

interface ICardStop {
	counterPause: number;
}

export function CardStop({ counterPause }: ICardStop) {
	return (
		<div className={counterPause !== 0 ? styles.cardStopActive : styles.cardStop}>
			<div>
				<h2 className={styles.cardStop_title}>Остановки</h2>
				<span className={styles.cardStop_percent}>{counterPause}</span>
			</div>
			<IconCardStop color={counterPause !== 0 ? '#7FC2D7' : '#C4C4C4'} />
		</div>
	);
}
