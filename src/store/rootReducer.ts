import { Reducer } from 'redux';
import { StatisticsState, statisticsReducer } from './statistics/reducer';
import { ADD_STAT, AddStatAction } from './statistics/action';
import { ActualTimerState, actualTimerReducer } from './actualTimer/reducer';
import { ADD_ACTIVE_TASK, AddActiveTaskAction, UPDATE_ACTIVE_TASK_STATUS, UPDATE_ACTIVE_TASK_SUCCESS, UpdateActiveTaskStatusAction, UpdateActiveTaskSuccessAction } from './actualTimer/action';
import { TasksState, tasksReducer } from './tasks/reducer';
import { ADD_NEW_TASK, DECREMENT_COUNT, DELETE_TASK, INCREMENT_COUNT, SORT_LIST, UPDATE_TASKS } from './tasks/action';
import { AddNewTaskAction, DecrementCount, DeleteTaskAction, IncrementCount, SortTasksAction, UpdateTasks } from './tasks/action';
import { ActualDateState, actualDateReducer } from './actualDate/reducer';
import { ACTUAL_DATE, ActualDateAction } from './actualDate/action';

export interface RootState {
    tasks: TasksState;
    actualTimer: ActualTimerState;
    statisticsState: StatisticsState;
    actualDate: ActualDateState;
}

const initialState: RootState = {
    tasks: {
        tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'),
    },
    statisticsState: {
        stat: JSON.parse(localStorage.getItem('statistics') ?? '{}'),
    },
    actualDate: {
        actualDate: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    },
    actualTimer: {
        actualTimer: {
            title: '',
            id: '',
            timer: {
                startTime: 0,
                timerStatus: '',
                nameTitle: ''
            },
            counter: 0,
            pomodoro: 0
        }
    }
};

type MyAction =
    | AddStatAction
    | AddNewTaskAction
    | AddActiveTaskAction
    | UpdateActiveTaskStatusAction
    | UpdateActiveTaskSuccessAction
    | SortTasksAction
    | IncrementCount
    | DecrementCount
    | DeleteTaskAction
    | UpdateTasks
    | ActualDateAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACTIVE_TASK_STATUS:
        case UPDATE_ACTIVE_TASK_SUCCESS:
        case ADD_ACTIVE_TASK:
            return {
                ...state,
                actualTimer: actualTimerReducer(state.actualTimer, action),
            };
        case ADD_NEW_TASK:
        case SORT_LIST:
        case INCREMENT_COUNT:
        case DECREMENT_COUNT:
        case DELETE_TASK:
        case UPDATE_TASKS:
            return {
                ...state,
                tasks: tasksReducer(state.tasks, action),
            };
        case ADD_STAT:
            return {
                ...state,
                statisticsState: statisticsReducer(state.statisticsState, action),
            };
        case ACTUAL_DATE:
            return {
                ...state,
                actualDate: actualDateReducer(state.actualDate, action),
            };
        default:
            return state;
    }
};
