import React, { useContext, useState } from 'react';
import styles from './todolist.module.css';
import { Menu } from '../Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addActiveTask } from '../../store/actualTimer/action';
import {
	aditTitleTask,
	decrementCount,
	incrementCount,
	sortTasks,
} from '../../store/tasks/action';
import { ITask } from '../../store/tasks/reducer';
import { modalContext } from '../Context/modalContext';
import { optionContext } from '../Context/optionContext';

export function TodoList() {
	const todoList = useSelector<RootState, ITask[]>(
		(state) => state.tasks.tasks
	);
	const [isEdit, setIsEdit] = useState('');
	const { value, onChange } = useContext(modalContext);
	const { option, optionChange } = useContext(optionContext);
	const dispatch = useDispatch();

	const handleClick = (id: string) => {
		const item = todoList.find((task) => task.id === id);
		dispatch(
			addActiveTask({
				title: item?.title,
				id: item?.id,
				timer: {
					timerStatus: 'default',
					startTime: 300,
					nameTitle: item?.title,
				},
				counter: item?.counter,
				pomodoro: item?.pomodoro,
			})
		);
		dispatch(sortTasks(item?.id));
	};

	function handleClickIncrement(id: string) {
		dispatch(incrementCount(id));
	}

	function handleClickDecrement(id: string) {
		dispatch(decrementCount(id));
	}

	function handleClickEdit(id: string) {
		setIsEdit(id);
	}

	function handleClickDelete(id: string) {
		onChange(true);
		optionChange(id);
	}

	return (
		<ul className={styles.todoList}>
			{todoList.map((item) => (
				<li key={item.id} className={styles.item} id={item.id}>
					<div className={styles.counter}>{item.counter}</div>
					{isEdit === item.id && (
						<input
							className={styles.titleEdit}
							defaultValue={item.title}
							onBlur={(e) => {
								if (
									!e.currentTarget.contains(e.relatedTarget)
								) {
									item.title = e.currentTarget.value;
									dispatch(aditTitleTask(item));
									setIsEdit('');
								}
							}}
						></input>
					)}

					{isEdit !== item.id && (
						<button
							className={styles.titleButton}
							onClick={() => handleClick(item.id)}
						>
							{item.title}
						</button>
					)}
					<Menu
						handleClickDecrement={() =>
							handleClickDecrement(item.id)
						}
						handleClickIncrement={() =>
							handleClickIncrement(item.id)
						}
						handleClickEdit={() => handleClickEdit(item.id)}
						handleClickDelete={() => handleClickDelete(item.id)}
					/>
				</li>
			))}
		</ul>
	);
}
