/**
 * Returns the longest string in an array (or the last one in array if multiple strings have the same length)
 * @param {Array} arr array of strings
 * @returns {String} longest string
 */
const getLongestString = (arr) => {
	if (!Array.isArray(arr)) throw new TypeError('Given parameter is not an array');
	if (arr.length === 0) throw new Error('Array is empty');
	return arr.reduce(function(a, b) {
		return a.length > b.length ? a : b;
	});
};

module.exports = {
	getLongestString
};
