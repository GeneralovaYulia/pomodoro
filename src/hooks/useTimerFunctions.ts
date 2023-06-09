import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store/rootReducer";
import { ITask } from "../store/actualTimer/reducer";
import { addStatTask } from "../store/statistics/action";
import { addActiveTask } from "../store/actualTimer/action";
import { deleteTaskList, updateTasks } from "../store/tasks/action";
import useSound from 'use-sound';
import song from '../utils/music/song.mp3';
import { timerTypeAction } from "../store/timerType/action";

interface ITimerHook {
    timerType: string,
    status: string;
    timerOn: boolean;
    timeLeft: number;
    pomodoro: number;
    workTime: number;
    pauseTime: number;
    counterPause: number;
    setTimeLeft: (timeLeft: number) => void;
    setTimerOn: (indent: boolean) => void;
    setPomodoro: (pomodoro: number) => void;
    setPauseTime: (time: number) => void;
}

export const useTimerFunctions = ({
    timerType,
    status,
    timerOn,
    timeLeft,
    pomodoro,
    workTime,
    pauseTime,
    counterPause,
    setTimeLeft,
    setTimerOn,
    setPomodoro,
    setPauseTime,
}: ITimerHook) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const timerCurrent = useSelector<RootState, ITask>((state) => state.actualTimer.actualTimer);
    let timer: string | number | NodeJS.Timeout | undefined;
    const [play] = useSound(song);

    useEffect(() => {
        if (timerOn && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            play();
            setTimerOn(false);
            setPomodoro(pomodoro + 1);

            if (timerType === 'WorkTimer') {
                dispatch(
                    addStatTask({
                        createDate: new Date().toISOString(),
                        workTime: workTime - timeLeft,
                        pauseTime: 0,
                        counterPause: 0,
                        pomodoros: 1,
                    })
                );
                dispatch(
                    addActiveTask({
                        title: timerCurrent.title,
                        id: timerCurrent.id,
                        timer: {
                            timerStatus: "default",
                            startTime: 180,
                            nameTitle: timerCurrent.title,
                        },
                        counter: timerCurrent.counter - 1,
                        pomodoro: pomodoro + 1,
                    })
                );
                dispatch(updateTasks(timerCurrent.id));
    
                if (timerCurrent.counter === 1) {
                    dispatch(deleteTaskList(timerCurrent.id));
                    setTimeLeft(300);
                    dispatch(
                        addActiveTask({
                            title: "",
                            id: "",
                            timer: {
                                timerStatus: "default",
                                startTime: 300,
                                nameTitle: "",
                            },
                            counter: "",
                            pomodoro: "",
                        })
                    );
                }
                dispatch(timerTypeAction('PauseTimer'))
            }

            if (timerType === 'PauseTimer') {
                dispatch(
                    addStatTask({
                        createDate: new Date().toISOString(),
                        workTime: 0,
                        pauseTime: workTime - timeLeft,
                        counterPause: 1,
                        pomodoros: 0,
                    })
                );
                dispatch(
                    addActiveTask({
                        title: "",
                        id: "",
                        timer: {
                            timerStatus: "default",
                            startTime: 300,
                            nameTitle: "",
                        },
                        counter: "",
                        pomodoro: "",
                    })
                );
                dispatch(timerTypeAction('WorkTimer'));
            }

            return () => clearInterval(timer);
        }

        if (!timerOn && status === "active") {
            timer = setInterval(() => setPauseTime(pauseTime + 1), 1000);
        }

        return () => clearInterval(timer);
    }, [timerOn, timeLeft, pauseTime]);

    return null;
};