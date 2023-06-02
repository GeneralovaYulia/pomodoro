export function getWord(value: number, words: [string, string, string]) {
	if (
		value === 1 ||
		value === 21 ||
		value === 31 ||
		value === 41 ||
		value === 51
	)
		return words[0];
	if (value > 1 && value < 5) return words[1];
	if (value >= 22 && value < 25) return words[1];
	if (value >= 32 && value < 35) return words[1];
	if (value >= 42 && value < 45) return words[1];
	if (value >= 52 && value < 55) return words[1];

	return words[2];
}