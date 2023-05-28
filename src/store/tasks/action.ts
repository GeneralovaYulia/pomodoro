import { ActionCreator } from 'redux';
import { ITask } from './reducer';

export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export type AddNewTaskAction = {
    type: typeof ADD_NEW_TASK;
    task: ITask;
};

export const addNewTask: ActionCreator<AddNewTaskAction> = (task) => ({
    type: ADD_NEW_TASK,
    task,
});

export function addNew(state: { tasks: ITask[] }, task: ITask) {
    const tasks = state.tasks;
    tasks.push(task);
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);

    return [...tasks];
}

export const SORT_LIST = 'SORT_LIST';
export type SortTasksAction = {
    type: typeof SORT_LIST;
    id: string;
};

export const sortTasks: ActionCreator<SortTasksAction> = (id: string) => ({
    type: SORT_LIST,
    id,
});

export function sort(state: { tasks: ITask[] }, idToMoveToTop: string) {
    const tasks = state.tasks;
    const taskToMoveToTop: any = tasks.find((task) => task.id === idToMoveToTop);
    const sortedTasks = tasks.filter((task) => task.id !== idToMoveToTop);

    return [taskToMoveToTop, ...sortedTasks];
}

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export type IncrementCount = {
    type: typeof INCREMENT_COUNT;
    id: string;
};

export const incrementCount: ActionCreator<IncrementCount> = (id: string) => ({
    type: INCREMENT_COUNT,
    id,
});

export function increment(state: { tasks: ITask[] }, id: string) {
    const tasks = state.tasks;
    const index = tasks.findIndex((el) => el.id === id);
    tasks[index].counter = tasks[index].counter + 1;
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);

    return [...tasks];
}

export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export type DecrementCount = {
    type: typeof DECREMENT_COUNT;
    id: string;
};

export const decrementCount: ActionCreator<DecrementCount> = (id: string) => ({
    type: DECREMENT_COUNT,
    id,
});

export function decrement(state: { tasks: ITask[] }, id: string) {
    const tasks = state.tasks;
    const index = tasks.findIndex((el) => el.id === id);
    if (tasks[index].counter > 1) {
        tasks[index].counter = tasks[index].counter - 1;
        const serializedState = JSON.stringify(tasks);
        localStorage.setItem('tasks', serializedState);
    }

    return [...tasks];
}

export const DELETE_TASK = 'DELETE_TASK';
export type DeleteTaskAction = {
    type: typeof DELETE_TASK;
    id: string;
};

export const deleteTaskList: ActionCreator<DeleteTaskAction> = (id: string) => ({
    type: DELETE_TASK,
    id,
});

export function deleteTask(state: { tasks: ITask[] }, id: string) {
    const tasks = state.tasks;
    const sortedTasks = tasks.filter((t) => t.id !== id);

    const serializedState = JSON.stringify(sortedTasks);
    localStorage.setItem('tasks', serializedState);

    return [...sortedTasks];
}

export const UPDATE_TASKS = 'UPDATE_TASKS';
export type UpdateTasks = {
    type: typeof UPDATE_TASKS;
    id: string;
};

export const updateTasks: ActionCreator<UpdateTasks> = (id: string) => ({
    type: UPDATE_TASKS,
    id,
});

export function update(state: { tasks: ITask[] }, id: string) {
    const tasks = state.tasks;
    const index = tasks.findIndex((el) => el.id === id);
    tasks[index].pomodoro = tasks[index].pomodoro + 1;
    tasks[index].counter = tasks[index].counter - 1;
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);

    return [...tasks];
}

export const ADIT_TITLE_TASK = 'ADIT_TITLE_TASK';
export type AditTitleTaskAction = {
    type: typeof ADIT_TITLE_TASK;
    task: ITask;
};

export const aditTitleTask: ActionCreator<AditTitleTaskAction> = (task) => ({
    type: ADIT_TITLE_TASK,
    task,
});

export function aditTitle(state: { tasks: ITask[] }, task: ITask) {
    const tasks = state.tasks;
    const index = tasks.findIndex((el) => el.id === task.id);
    tasks[index].title = task.title;
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);

    return [...tasks];
}