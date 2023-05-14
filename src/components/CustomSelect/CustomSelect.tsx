import React from 'react';
import styles from './customselect.module.css';

interface IDropdownProps {
	button: React.ReactNode;
	children: React.ReactNode;
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

export function CustomSelect({
	button,
	children,
	isOpen,
	onOpen = NOOP,
	onClose = NOOP,
}: IDropdownProps) {
	const [isCustomSelect, setIsCustomSelect] = React.useState(false);

	const handleOpen = () => {
		if (isOpen === undefined) {
			setIsCustomSelect(!isCustomSelect);
		}
	};

	return (
		<div className={styles.container}>
			<div onClick={handleOpen}>{button}</div>
			{isCustomSelect && (
				<div className={styles.listContainer}>
					<div
						className={styles.list}
						onClick={() => setIsCustomSelect(false)}
					>
						{children}
					</div>
				</div>
			)}
		</div>
	);
}
