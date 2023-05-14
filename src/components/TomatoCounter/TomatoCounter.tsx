import React from 'react';
import styles from './tomatocounter.module.css';
import { IconTomatoBig, IconTomatoSmall } from '../Icons';

interface ITomatoCounter {
	pomodoros: number;
}

export function TomatoCounter({ pomodoros }: ITomatoCounter) {
	return (
		<div className={styles.tomatoCounter}>
			{pomodoros !== 0 && (
				<>
					<div className={styles.tomapoSmall}>
						<IconTomatoSmall />
					</div>
					<div className={styles.bottomBlock}>
						{pomodoros} помидора
					</div>
				</>
			)}
			{pomodoros === 0 && <IconTomatoBig />}
		</div>
	);
}
