import React from 'react';
import styles from './dropdown.module.css';

interface IDropdownProps {
	button: React.ReactNode;
	children: React.ReactNode;
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

export function Dropdown({
	button,
	children,
	isOpen,
}: IDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

	const handleOpen = () => {
		if (isOpen === undefined) {
			setIsDropdownOpen(!isDropdownOpen);
		}
	};

	return (
		<div className={styles.container}>
			<div onClick={handleOpen}>{button}</div>
			{isDropdownOpen && (
				<div className={styles.listContainer}>
					<div
						className={styles.list}
						onClick={() => setIsDropdownOpen(false)}
					>
						{children}
					</div>
				</div>
			)}
		</div>
	);
}
