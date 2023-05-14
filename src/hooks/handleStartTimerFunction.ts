import { ITask } from "../store/actualTimer/reducer";
import { addActiveTask } from "../store/actualTimer/action";

interface ITimerHook {
	timerOn: boolean;
	timeLeft: number;
	counterPause: number;
	setTimerOn: (indent: boolean) => void;
	setCounterPause: (counterPause: number) => void;
	dispatch: any;
	timerCurrent: ITask;
}

export const handleStartTimerFunction = ({
	timerOn,
	timeLeft,
	counterPause,
	setTimerOn,
	setCounterPause,
	dispatch,
	timerCurrent,
}: ITimerHook) => {
	const startTimer = () => {
		if (!timerOn) {
			setTimerOn(true);
			dispatch(addActiveTask({
				title: timerCurrent.title,
				id: timerCurrent.id,
				timer: {
					timerStatus: 'active',
					startTime: timeLeft,
					nameTitle: timerCurrent.title,
				},
				counter: timerCurrent.counter,
				pomodoro: timerCurrent.pomodoro,
			})
			);
		} else {
			setCounterPause(counterPause + 1);
			setTimerOn(false);
		}
	}
	startTimer();
};