import React, { useState } from 'react';
import styles from './formtodo.module.css';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addActiveTask } from '../../store/actualTimer/action';
import { addNewTask } from '../../store/tasks/action';

export function FormToDo() {
	const [tasks, setTasks] = useState('');
	const dispatch = useDispatch();

	//function handleChange(e: ChangeEvent<HTMLInputElement>) {
	//	setTasks(e.currentTarget.value);
	//}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!tasks) return;
		const task = {
			title: tasks,
			id: nanoid(),
			timer: {
				timerStatus: 'default',
				startTime: 300,
				nameTitle: tasks,
			},
			counter: 1,
			pomodoro: 0,
		};
		dispatch(addActiveTask(task));
		dispatch(addNewTask(task));
		setTasks('');
	}

	return (
		<form className={styles.TodoForm} onSubmit={handleSubmit}>
			<input
				type="text"
				className={styles.TodoForm_input}
				placeholder="Название задачи"
				value={tasks}
				onChange={(e) => setTasks(e.target.value)}
			/>
			<button className={styles.TodoForm_button} type="submit">
				Добавить
			</button>
		</form>
	);
}
