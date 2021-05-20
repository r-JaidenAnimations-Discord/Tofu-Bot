// Note to self: buildTimeCode and parseMS can be removed probably as they are part of the previous humanReadable timecode generator iteration


/**
 * Builds a time code in h m s format, omitting h and m if they are 0
 * @param {Int} msDuration Timestamp/timecode in milliseconds
 * @returns {String} Time in h m s format
 */
const humanReadableDuration = (msDuration) => {
	const h = Math.floor(msDuration / 1000 / 60 / 60);
	const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
	const s = Math.floor(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60);

	// To get time format 00:00:00
	const seconds = s < 10 ? `0${s}s` : `${s}s`;
	const minute = m < 10 ? `0${m}m ` : `${m}m `;
	const hours = h < 10 ? `0${h}h ` : `${h}h `;

	let finalHourString = h === 0 ? '' : hours;
	let finalMinuteString = m === 0 ? '' : minute;
	//let finalSecondString = s === 0 ? '' : seconds;

	return `${finalHourString}${finalMinuteString}${seconds}`;
}

/**
 * Builds time code
 * @param {object} data The data to build time code from
 * @returns {String}
 */
const buildTimeCode = (data) => {
	const items = Object.keys(data);
	const required = ['days', 'hours', 'minutes', 'seconds'];
	const parsed = items.filter((x) => required.includes(x)).map((m) => (data[m] > 0 ? data[m] : ''));
	const final = parsed
		.filter((x) => !!x)
		.map((x) => x.toString().padStart(2, '0'))
		.join(':');
	return final.length <= 3 ? `0:${final.padStart(2, '0') || 0}` : final;
}

/**
 * Parses ms time
 * @param {Number} milliseconds Time to parse
 * @returns {TimeData}
 */
const parseMS = (milliseconds) => {
	const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
	return {
		days: roundTowardsZero(milliseconds / 86400000),
		hours: roundTowardsZero(milliseconds / 3600000) % 24,
		minutes: roundTowardsZero(milliseconds / 60000) % 60,
		seconds: roundTowardsZero(milliseconds / 1000) % 60
	};
}

module.exports = {
	buildTimeCode,
	parseMS,
	humanReadableDuration
}
