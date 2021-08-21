/**
 * Builds a time code in h m s format, omitting h and m if they are 0
 * @param {Number} msDuration Timestamp/timecode in milliseconds
 * @returns {String} Time in h m s format
 */
const humanReadableDuration = (msDuration) => {
	const h = Math.floor(msDuration / 1000 / 60 / 60);
	const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
	const s = Math.floor(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60);

	// To get time format 00:00:00
	const seconds = s < 10 ? `0${s}s` : `${s}s`;
	const minutes = m < 10 ? `0${m}m ` : `${m}m `;
	const hours = h < 10 ? `0${h}h ` : `${h}h `;

	return `${h ? hours : ''}${m ? minutes : ''}${seconds}`;
};

/**
 * Builds a time code in h m s, omitting h and m if they are 0, rounding up s to avoid 'please wait 0 seconds'
 * @param {Number} msDuration Timestamp/timecode in milliseconds
 * @returns {String} Time in simple format
 */
const simpleDuration = (msDuration) => {
	const h = Math.floor(msDuration / 1000 / 60 / 60);
	const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
	const s = Math.ceil(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60); // Using ceil to always round up to avoid 'pls wait 0 seconds'

	return `${h ? h + 'h' : ''}${m ? m + 'm' : ''}${s}s`;
};

module.exports = {
	humanReadableDuration,
	simpleDuration
};
