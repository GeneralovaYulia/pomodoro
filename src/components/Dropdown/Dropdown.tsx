import React, { useContext, useEffect, useRef } from 'react';
import styles from './dropdown.module.css';
import { Modal } from '../Modal';
import { modalContext } from '../Contexts/modalContext';
import { optionContext } from '../Contexts/optionContext';
import { useDispatch } from 'react-redux';
import { deleteTaskList } from '../../store/tasks/action';

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
}: IDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const { value, onChange } = useContext(modalContext);
	const { option, optionChange } = useContext(optionContext);
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	function handleChange() {
		dispatch(deleteTaskList(option));
		onChange(false);
	}

	const onClose = () => handleChange();

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				event.target instanceof Node &&
				!ref.current?.contains(event.target)
			) {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	const handleOpen = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className={styles.container} ref={ref}>
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
			{value && (
				<Modal
					visible={value}
					onClose={onClose}
				/>
			)}
		</div>
	);
}
