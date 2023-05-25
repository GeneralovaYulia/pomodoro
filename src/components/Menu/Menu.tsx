import React from 'react';
import styles from './menu.module.css';
import { IconDropdown } from '../Icons';
import { MenuItemsList } from './MenuItemsList';
import { Dropdown } from '../Dropdown';

export interface IMenu {
	handleClickIncrement: () => void;
	handleClickDecrement: () => void;
	handleClickDelete: () => void;
	handleClickEdit: () => void;
}

export function Menu({
	handleClickIncrement,
	handleClickDecrement,
	handleClickDelete,
	handleClickEdit,
}: IMenu) {
	return (
		<div className={styles.menu}>
			<Dropdown
				button={
					<button>
						<IconDropdown />
					</button>
				}
			>
				<div className={styles.menuItemsList}>
					<MenuItemsList
						handleClickIncrement={handleClickIncrement}
						handleClickDecrement={handleClickDecrement}
						handleClickDelete={handleClickDelete}
						handleClickEdit={handleClickEdit}
					/>
				</div>
			</Dropdown>
		</div>
	);
}
