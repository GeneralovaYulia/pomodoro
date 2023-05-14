import React from 'react';
import styles from './selectinterval.module.css';

export function SelectInterval() {
	return (
		<ul className={styles.selectInterval}>
			<div
				className={styles.divider + ' ' + styles.mobileSelectItem}
			></div>
			<li
				className={styles.selectItem + ' ' + styles.mobileSelectItem}
				onClick={() => console.log('postId')}
			>
				<span>Прошедшая неделя</span>
			</li>
			<div
				className={styles.divider + ' ' + styles.mobileSelectItem}
			></div>
			<li className={styles.selectItem + ' ' + styles.mobileSelectItem}>
				<span>2 недели назад</span>
			</li>
		</ul>
	);
}
