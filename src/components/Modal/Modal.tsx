import React, { useContext } from 'react';
import styles from './modal.module.css';
import { modalContext } from '../Context/modalContext';
import { IconPlusClose } from '../Icons';

interface ModalProps {
	visible: boolean;
	onClose: () => void;
}

export const Modal = ({
	visible = false,
	onClose,
}: ModalProps) => {
	const { value, onChange } = useContext(modalContext);

	if (!visible) return null;

	return (
		<div className={styles.modal} onClick={() => onChange(false)}>
			<div
				className={styles.modalDialog}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<h3 className={styles.modalTitle}>Удалить задачу?</h3>
					<span
						className={styles.modalClose}
						onClick={() => onChange(false)}
					>
						<IconPlusClose />
					</span>
				</div>
				<div className={styles.modalBody}>
					<button
						className={styles.modalButtonDelete}
						onClick={onClose}
					>
						Удалить
					</button>
					<button
						className={styles.modalButtonCancel}
						onClick={() => onChange(false)}
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};
