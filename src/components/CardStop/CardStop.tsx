import React from 'react';
import styles from './cardstop.module.css';
import { IconCardStop } from '../Icons';

interface ICardStop {
	counterPause: number;
}

export function CardStop({ counterPause }: ICardStop) {
	const headerStyles =
		counterPause !== 0 ? styles.cardStopActive : styles.cardStop;
	const color = counterPause !== 0 ? '#7FC2D7' : '#C4C4C4';

	return (
		<div className={headerStyles}>
			<div>
				<h2 className={styles.cardStop_title}>Остановки</h2>
				<span className={styles.cardStop_percent}>{counterPause}</span>
			</div>
			<IconCardStop color={color} />
		</div>
	);
}
