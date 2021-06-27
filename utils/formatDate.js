/**
 * Formats a given Date() to be shown in en-US format with "Weekday, Month D, YYYY, HH:MM:SS" display
 * @param {*} date 
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
		second: 'numeric'
	}).format(date);
}

module.exports = {
	formatDate
}