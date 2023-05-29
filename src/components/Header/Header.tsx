import React from 'react';
import styles from './header.module.css';
import { IconPomodoro } from '../Icons';
import { IconStatistics } from '../Icons/IconStatistics';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IHeader {
	onClick: () => void;
}

export function Header({ onClick }: IHeader) {
	return (
		<header className={styles.header}>
			<Container>
				<nav className={styles.header_nav}>
					<Link to="/" className={styles.header_logo}>
						<IconPomodoro />
						<div className={styles.header_title}>pomodoro_box</div>
					</Link>
					<div className={styles.theme}>
						<span>Темная тема</span>

							<input
								type="checkbox"
								className={styles.switcher}
								onChange={onClick}
							/>

					</div>
					<Link to={'/stat'} className={styles.statistics}>
						<IconStatistics />
						<div className={styles.statisticsTitle}>Статистика</div>
					</Link>
				</nav>
			</Container>
		</header>
	);
}
