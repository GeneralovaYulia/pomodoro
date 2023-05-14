import React from 'react';
import styles from './menu.module.css';
import { IconDropdown } from '../Icons';
import { MenuItemsList } from './MenuItemsList';
import { Dropdown } from '../Dropdown';

export interface IMenu {
	id: string;
}

export function Menu({ id }: IMenu) {
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
					<MenuItemsList id={id} />
				</div>
			</Dropdown>
		</div>
	);
}
