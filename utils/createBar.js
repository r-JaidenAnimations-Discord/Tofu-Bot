/**
 * Creates a progress bar where the bar and indicator are custom
 * @param {Number} total Total value of the bar (maximum value)
 * @param {Number} current Current value of the bar
 * @param {String} size Length of the bar
 * @param {String} line Character defenition as bar
 * @param {String} slider Character defenition as indicator
 * @returns {String} String built out of line characters and an indicator
 */
const createBar = (total, current, size = 40, line = '▬', slider = '🔵') => {
	if (!total) throw new Error('Total value is either not provided or invalid');
	if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
	if (isNaN(total)) throw new Error('Total value is not an integer');
	if (isNaN(current)) throw new Error('Current value is not an integer');
	if (isNaN(size)) throw new Error('Size is not an integer');
	if (current > total) throw new Error('Current value is greater than total');
	const percentage = current / total;
	const progress = Math.round((size * percentage));
	const emptyProgress = size - progress;
	const progressText = line.repeat(progress).replace(/.$/, slider);
	const emptyProgressText = line.repeat(emptyProgress);
	const bar = progressText + emptyProgressText;
	// const calculated = percentage * 100;
	// return [bar, calculated];
	return bar;

};
module.exports = {
	createBar
};
