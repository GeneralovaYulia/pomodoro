import React from 'react';
import styles from './select.module.css';
import { IconChoice } from '../Icons';
import { CustomSelect } from '../CustomSelect';
import { SelectInterval } from './SelectInterval';

export function Select() {
	return (
		<div className={styles.select}>
			<CustomSelect
				button={
					<button className={styles.menuButton}>
						<span>Эта неделя</span>
						<IconChoice />
					</button>
				}
			>
				<div className={styles.customSelect}>
					<SelectInterval />
				</div>
			</CustomSelect>
		</div>
	);
}
