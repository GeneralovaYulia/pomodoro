import React from 'react';
import styles from './mainpage.module.css';
import { Header } from '../Header';
import { Container } from 'react-bootstrap';
import { FormToDo } from '../FormToDo';
import { TimerWindows } from '../TimerWindows';
import { TodoList } from '../TodoList';

export function MainPage() {
	return (
		<>
			<Header />
			<Container>
				<div className={styles.main}>
					<div className={styles.listBlock}>
						<h1 className={styles.main_title}>
							Ура! Теперь можно начать работать:
						</h1>
						<ul className={styles.main_list}>
							<li className={styles.main_item}>
								Выберите категорию и напишите название текущей
								задачи
							</li>
							<li className={styles.main_item}>
								Запустите таймер («помидор»)
							</li>
							<li className={styles.main_item}>
								Работайте пока «помидор» не прозвонит
							</li>
							<li className={styles.main_item}>
								Сделайте короткий перерыв (3-5 минут)
							</li>
							<li className={styles.main_item}>
								Продолжайте работать «помидор» за «помидором»,
								пока задача не будут выполнена. Каждые 4
								«помидора» делайте длинный перерыв (15-30
								минут).
							</li>
						</ul>
						<FormToDo />
						<TodoList />
						<div className={styles.totalTime}>25 мин</div>
					</div>
					<div className={styles.timerWindows}>
						<TimerWindows />
					</div>
				</div>
			</Container>
		</>
	);
}
