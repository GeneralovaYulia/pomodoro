export function getFocusPercent(workTime: number, pauseTime: number) {
    let effectProcent;
	if (workTime === 0 && pauseTime === 0) {
		effectProcent = 0;
	} else {
		effectProcent = (workTime / (workTime + pauseTime)) * 100;
	}

	const procent = Math.floor(effectProcent);
	
    return procent;
}