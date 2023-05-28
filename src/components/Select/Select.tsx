import React, { useState } from 'react';
import styles from './select.module.css';
import { useDispatch } from 'react-redux';
import { actualPeriodAction } from '../../store/actualPeriod/action';
import { IconChoice } from '../Icons';

const options = [
	{ value: 'thisWeek', label: 'Эта неделя' },
	{ value: 'lastWeek', label: 'Прошедшая неделя' },
	{ value: 'twoWeek', label: '2 недели назад' },
];

export function Selection() {
	const [isActive, setIsActive] = useState(false);
	const currentItem = options[0];
	const [selectedOption, setSelectedOption] = useState(currentItem);
	const dispatch = useDispatch();
	const sortOptions = options.filter((el) => el.label !== selectedOption.label);

	return (
		<div className={styles.dropdown}>
			<div
				className={styles.dropdownBtn}
				onClick={() => setIsActive(!isActive)}
			>
				{selectedOption.label}
				<span>
					<IconChoice isActive={isActive} />
				</span>
			</div>
			{isActive && (
				<div className={styles.dropdownContent}>
					{sortOptions.map((option) => (
						<div
							key={option.value}
							onClick={() => {
								dispatch(actualPeriodAction(option.value));
								setSelectedOption(option);
								setIsActive(false);
							}}
							className={styles.dropdownItem}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
