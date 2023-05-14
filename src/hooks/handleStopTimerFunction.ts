import { ITask } from "../store/actualTimer/reducer";
import { addActiveTask } from "../store/actualTimer/action";
import { addStatTask } from "../store/statistics/action";
import { deleteTaskList, updateTasks } from "../store/tasks/action";

interface ITimerHook {
    status: string;
    timerOn: boolean;
    timeLeft: number;
    pomodoro: number;
    workTime: number;
    pauseTime: number;
    counterPause: number;
    setTimeLeft: (timeLeft: number) => void;
    setTimerOn: (indent: boolean) => void;
    setPauseTime: (time: number) => void;
    setWorkTime: (time: number) => void;
    setCounterPause: (count: number) => void;
    dispatch: any;
    timerCurrent: ITask;
}

export const handleStopTimerFunction = ({
    status,
    timerOn,
    timeLeft,
    pomodoro,
    workTime,
    pauseTime,
    counterPause,
    setTimeLeft,
    setTimerOn,
    setPauseTime,
    setWorkTime,
    setCounterPause,
    dispatch,
    timerCurrent,
}: ITimerHook) => {
    const stopTimer = () => {
        setTimerOn(false);
        if (!timerOn && status === 'active') {
            dispatch(
                addStatTask({
                    workTime: workTime - timeLeft,
                    pauseTime: pauseTime,
                    counterPause: counterPause,
                    pomodoros: 1,
                })
            );
            dispatch(updateTasks(timerCurrent.id));
            dispatch(
                addActiveTask({
                    title: timerCurrent.title,
                    id: timerCurrent.id,
                    timer: {
                        timerStatus: 'default',
                        startTime: 300,
                        nameTitle: timerCurrent.title,
                    },
                    counter: timerCurrent.counter - 1,
                    pomodoro: pomodoro + 1,
                })
            );

            if (timerCurrent.counter === 1) {
                dispatch(deleteTaskList(timerCurrent.id));
                dispatch(
                    addActiveTask({
                        title: '',
                        id: '',
                        timer: {
                            timerStatus: 'default',
                            startTime: 300,
                            nameTitle: '',
                        },
                        counter: '',
                        pomodoro: '',
                    })
                );
            }
        } else {
            dispatch(
                addStatTask({
                    workTime: workTime - timeLeft,
                    pauseTime: pauseTime,
                    counterPause: counterPause,
                    pomodoros: 0,
                })
            );
            dispatch(
                addActiveTask({
                    title: timerCurrent.title,
                    id: timerCurrent.id,
                    timer: {
                        timerStatus: 'default',
                        startTime: 300,
                        nameTitle: timerCurrent.title,
                    },
                    counter: timerCurrent.counter,
                    pomodoro: timerCurrent.pomodoro,
                })
            );
        }
        setTimeLeft(300);
        setPauseTime(0);
        setWorkTime(300);
        setCounterPause(0);
    };
    stopTimer();
};