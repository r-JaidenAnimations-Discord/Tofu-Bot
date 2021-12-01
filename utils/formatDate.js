/**
 * Formats a given Date() to be shown in en-US format with "Weekday, Month D, YYYY, HH:MM:SS" display
 * @param {Date} date date object
 * @returns Date but formatted
 */
const formatDate = (date) => {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'Europe/Brussels'
	}).format(date);
};

module.exports = {
	formatDate
};
