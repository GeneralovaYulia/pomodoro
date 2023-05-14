import { Reducer } from 'redux';
import { ADD_NEW_TASK, DECREMENT_COUNT, DELETE_TASK, INCREMENT_COUNT, SORT_LIST, UPDATE_TASKS } from './action';
import { AddNewTaskAction, DecrementCount, DeleteTaskAction, IncrementCount, SortTasksAction, UpdateTasks, addNew, decrement, deleteTask, increment, sort, update } from './action';

export type ITimer = {
    startTime: number;
    timerStatus: string;
    nameTitle: string;
};

export type ITask = {
    title: string;
    id: string;
    timer: ITimer;
    counter: number;
    pomodoro: number;
};

export interface TasksState {
    tasks: ITask[];
}

const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'),
};

type MyAction =
    | AddNewTaskAction
    | SortTasksAction
    | IncrementCount
    | DecrementCount
    | DeleteTaskAction
    | UpdateTasks;

export const tasksReducer: Reducer<TasksState, MyAction> = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_TASK:
            return {
                ...state,
                tasks: addNew(state, action.task),
            };
        case SORT_LIST:
            return {
                ...state,
                tasks: sort(state, action.id),
            };
        case INCREMENT_COUNT:
            return {
                ...state,
                tasks: increment(state, action.id),
            };
        case DECREMENT_COUNT:
            return {
                ...state,
                tasks: decrement(state, action.id),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: deleteTask(state, action.id),
            };
        case UPDATE_TASKS:
            return {
                ...state,
                tasks: update(state, action.id),
            };
        default:
            return state;
    }
};
