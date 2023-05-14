import React from 'react';
import styles from './todolist.module.css';
import { Menu } from '../Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addActiveTask } from '../../store/actualTimer/action';
import { sortTasks } from '../../store/tasks/action';
import { ITask } from '../../store/tasks/reducer';

export function TodoList() {
	const todoList = useSelector<RootState, ITask[]>((state) => state.tasks.tasks);
	//const [tasksList, setTasksList] = useState(todoList);
	const disparch = useDispatch();

	//useEffect(() => {
	//  setTasksList(todoList)
	//}, [todoList])

	const handleClick = (id: string) => {
		const item = todoList.find((task) => task.id === id);

		disparch(
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

		disparch(sortTasks(item?.id));
	};

	return (
		<ul className={styles.todoList}>
			{todoList.map((item) => (
				<li key={item.id} className={styles.item} id={item.id}>
					<div className={styles.counter}>{item.counter}</div>
					<button
						className={styles.titleButton}
						onClick={() => handleClick(item.id)}
					>
						{item.title}
					</button>
					<Menu id={item.id} />
				</li>
			))}
		</ul>
	);
}
