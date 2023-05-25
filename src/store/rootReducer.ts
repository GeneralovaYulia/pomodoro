import { Reducer } from 'redux';
import { StatisticsState, statisticsReducer } from './statistics/reducer';
import { ADD_STAT, AddStatAction } from './statistics/action';
import { ActualTimerState, actualTimerReducer } from './actualTimer/reducer';
import { ADD_ACTIVE_TASK, AddActiveTaskAction, UPDATE_ACTIVE_TASK_STATUS, UPDATE_ACTIVE_TASK_SUCCESS, UpdateActiveTaskStatusAction, UpdateActiveTaskSuccessAction } from './actualTimer/action';
import { TasksState, tasksReducer } from './tasks/reducer';
import { ADD_NEW_TASK, ADIT_TITLE_TASK, AditTitleTaskAction, DECREMENT_COUNT, DELETE_TASK, INCREMENT_COUNT, SORT_LIST, UPDATE_TASKS } from './tasks/action';
import { AddNewTaskAction, DecrementCount, DeleteTaskAction, IncrementCount, SortTasksAction, UpdateTasks } from './tasks/action';
import { ActualBarState, actualBarReducer } from './actualBar/reducer';
import { ACTUAL_BAR, ActualBarAction } from './actualBar/action';
import { ACTUAL_PERIOD, ActualPeriodAction } from './actualPeriod/action';
import { ActualPeriodState, actualPeriodReducer } from './actualPeriod/reducer';

export interface RootState {
    tasks: TasksState;
    actualTimer: ActualTimerState;
    statisticsState: StatisticsState;
    actualBar: ActualBarState;
    actualPeriod: ActualPeriodState;
}

const initialState: RootState = {
    tasks: {
        tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'),
    },
    statisticsState: {
        stat: JSON.parse(localStorage.getItem('statistics') ?? '[]'),
    },
    actualBar: {
        actualBar: {
            workTime: 0,
            pauseTime: 0,
            pomodoros: 0,
            counterPause: 0,
            createDate: new Date(),
        },
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
    },
    actualPeriod: {
        actualPeriod: 'thisWeek',
    }
};

type MyAction =
    | AddStatAction
    | AddNewTaskAction
    | AddActiveTaskAction
    | ActualPeriodAction
    | UpdateActiveTaskStatusAction
    | UpdateActiveTaskSuccessAction
    | SortTasksAction
    | IncrementCount
    | DecrementCount
    | DeleteTaskAction
    | UpdateTasks
    | ActualBarAction
    | AditTitleTaskAction;

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
        case ADIT_TITLE_TASK:
            return {
                ...state,
                tasks: tasksReducer(state.tasks, action),
            };
        case ADD_STAT:
            return {
                ...state,
                statisticsState: statisticsReducer(state.statisticsState, action),
            };
        case ACTUAL_BAR:
            return {
                ...state,
                actualBar: actualBarReducer(state.actualBar, action),
            };
        case ACTUAL_PERIOD:
            return {
                ...state,
                actualPeriod: actualPeriodReducer(state.actualPeriod, action),
            };
        default:
            return state;
    }
};
