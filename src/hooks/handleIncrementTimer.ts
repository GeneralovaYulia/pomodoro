import { ITask } from "../store/actualTimer/reducer";
import { addActiveTask } from "../store/actualTimer/action";

interface ITimerHook {
    timeLeft: number;
    setTimeLeft: (timeLeft: number) => void;
    setWorkTime: (workTime: number) => void;
    dispatch: any;
    timerCurrent: ITask;
}

export const handleIncrementTimerFunction = ({
    timeLeft,
    setTimeLeft,
    setWorkTime,
    dispatch,
    timerCurrent,
}: ITimerHook) => {
    const incrementTimer = () => {
        setTimeLeft(timeLeft + 60);
        setWorkTime(timeLeft + 60);
        dispatch(
            addActiveTask({
                title: timerCurrent.title,
                id: timerCurrent.id,
                timer: {
                    timerStatus: 'default',
                    startTime: timeLeft + 60,
                    nameTitle: timerCurrent.title,
                },
                counter: timerCurrent.counter,
                pomodoro: timerCurrent.pomodoro,
            })
        );
    };
    incrementTimer();
};