import React from 'react';
import styles from './header.module.css';
import { IconPomodoro } from '../Icons';
import { IconStatistics } from '../Icons/IconStatistics';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Header() {
	return (
		<header className={styles.header}>
			<Container>
				<nav className={styles.header_nav}>
					<Link to="/" className={styles.header_logo}>
						<IconPomodoro />
						<div className={styles.header_title}>pomodoro_box</div>
					</Link>
					<Link to={'/stat'} className={styles.statistics}>
						<IconStatistics />
						<div className={styles.statistics_title}>
							Статистика
						</div>
					</Link>
				</nav>
			</Container>
		</header>
	);
}
