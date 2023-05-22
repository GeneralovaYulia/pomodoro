import { Reducer } from 'redux';
import { ADD_ACTIVE_TASK, AddActiveTaskAction, UPDATE_ACTIVE_TASK_STATUS, UPDATE_ACTIVE_TASK_SUCCESS, UpdateActiveTaskStatusAction, UpdateActiveTaskSuccessAction, updateActiveTaskStatus, updateActiveTaskSuccess } from './action';

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

export interface ActualTimerState {
    actualTimer: ITask;
}

const actualTimerState: ActualTimerState = {
    actualTimer: {
        title: '',
        id: '',
        timer: {
            startTime: 0,
            timerStatus: '',
            nameTitle: '',
        },
        counter: 0,
        pomodoro: 0,
    },
};

export type ActiveTimerAction =
    | AddActiveTaskAction
    | UpdateActiveTaskStatusAction
    | UpdateActiveTaskSuccessAction;

export const actualTimerReducer: Reducer<ActualTimerState, ActiveTimerAction> = (state = actualTimerState, action) => {
    switch (action.type) {
        case ADD_ACTIVE_TASK:
            return {
                ...state,
                actualTimer: action.task,
            };
        case UPDATE_ACTIVE_TASK_STATUS:
            return {
                ...state,
                actualTimer: updateActiveTaskStatus(state, action.task)
            };
        case UPDATE_ACTIVE_TASK_SUCCESS:
            return {
                ...state,
                actualTimer: updateActiveTaskSuccess(state, action.task)
            };
        default:
            return state;
    }
};
