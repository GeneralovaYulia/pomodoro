import React from 'react';
import styles from './menuitemslist.module.css';
import {
	IconDropdownDelete,
	IconDropdownEdit,
	IconDropdownMinus,
	IconDropdownPlus,
} from '../../Icons';

export interface IMenuItemsList {
	handleClickIncrement: () => void;
	handleClickDecrement: () => void;
	handleClickDelete: () => void;
	handleClickEdit: () => void;
}

export function MenuItemsList({
	handleClickIncrement,
	handleClickDecrement,
	handleClickDelete,
	handleClickEdit,
}: IMenuItemsList) {
	return (
		<ul className={styles.menuItemsList}>
			<li className={styles.menuItem + ' ' + styles.mobileMenuIten}>
				<button
					className={styles.buttonMenu}
					onClick={handleClickIncrement}
				>
					<IconDropdownPlus />
					<span className={styles.buttonText}>Увеличить</span>
				</button>
			</li>
			<li className={styles.menuItem + ' ' + styles.mobileMenuIten}>
				<button className={styles.buttonMenu}>
					<IconDropdownMinus />
					<span
						className={styles.buttonText}
						onClick={handleClickDecrement}
					>
						Уменьшить
					</span>
				</button>
			</li>
			<li className={styles.menuItem + ' ' + styles.mobileMenuIten}>
				<button className={styles.buttonMenu} onClick={handleClickEdit}>
					<IconDropdownEdit />
					<span className={styles.buttonText}>Редактировать</span>
				</button>
			</li>
			<li className={styles.menuItem + ' ' + styles.mobileMenuIten}>
				<button className={styles.buttonMenu} onClick={handleClickDelete}>
					<IconDropdownDelete />
					<span className={styles.buttonText}>Удалить</span>
				</button>
			</li>
		</ul>
	);
}
