export function updateActiveTaskStatus(state: { actualTimer: any; }, task: string) {
    const actualTimer = state.actualTimer;
    actualTimer.timer.timerStatus = task;

    return [...actualTimer];
}