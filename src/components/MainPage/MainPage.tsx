import React from 'react';
import styles from './mainpage.module.css';
import { Header } from '../Header';
import { Container } from 'react-bootstrap';
import { FormToDo } from '../FormToDo';
import { TimerWindows } from '../TimerWindows';
import { TodoList } from '../TodoList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ITask } from '../../store/tasks/reducer';

export function MainPage() {
	const tasks = useSelector<RootState, ITask[]>(state => state.tasks.tasks);

	const tasksWork = [];

	for (let i = 0; i < tasks.length; i++) {
		tasksWork.push(tasks[i].timer.startTime);
	}
	
	const totalTime = tasksWork.reduce(function (currentSum, currentNumber) {
		return currentSum + currentNumber
	}, 0)

	const minutes = Math.floor(totalTime / 60);
	const hours = Math.floor(minutes / 60);
	let time;

	if (hours === 0) {
		time = minutes + ' ' + 'мин'
	} else {
		time = hours + ' '  +  'ч' + ' ' + minutes + ' ' + 'мин'
	}

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
						<div className={styles.totalTime}>{time}</div>
					</div>
					<div className={styles.timerWindows}>
						<TimerWindows />
					</div>
				</div>
			</Container>
		</>
	);
}
