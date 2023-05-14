import { ActionCreator } from 'redux';
import { ITask } from './reducer';

export const ADD_ACTIVE_TASK = 'ADD_ACTIVE_TASK';
export type AddActiveTaskAction = {
    type: typeof ADD_ACTIVE_TASK;
    task: ITask;
};

export const addActiveTask: ActionCreator<AddActiveTaskAction> = (task) => ({
    type: ADD_ACTIVE_TASK,
    task,
});

export const UPDATE_ACTIVE_TASK_STATUS = 'UPDATE_ACTIVE_TASK_STATUS';
export type UpdateActiveTaskStatusAction = {
    type: typeof UPDATE_ACTIVE_TASK_STATUS;
    task: string;
};

export const UpdateActiveTaskStatus: ActionCreator<UpdateActiveTaskStatusAction> = (task: string) => ({
    type: UPDATE_ACTIVE_TASK_STATUS,
    task,
})

export function updateActiveTaskStatus(state: { actualTimer: ITask; }, task: string) {
    const actualTimer = state.actualTimer;
    actualTimer.timer.timerStatus = task;

    return actualTimer;
}

export const UPDATE_ACTIVE_TASK_SUCCESS = 'UPDATE_ACTIVE_TASK_SUCCESS';
export type UpdateActiveTaskSuccessAction = {
    type: typeof UPDATE_ACTIVE_TASK_SUCCESS;
    task: ITask;
};

export const UpdateActiveTaskSuccess: ActionCreator<UpdateActiveTaskSuccessAction> = (task: ITask) => ({
    type: UPDATE_ACTIVE_TASK_SUCCESS,
    task,
})

export function updateActiveTaskSuccess(state: { actualTimer: ITask; }, task: ITask) {
    const actualTimer = state.actualTimer;
    actualTimer.counter = actualTimer.counter - 1;
    actualTimer.pomodoro = actualTimer.pomodoro + 1;
    actualTimer.timer.timerStatus = 'default';

    return actualTimer;
}