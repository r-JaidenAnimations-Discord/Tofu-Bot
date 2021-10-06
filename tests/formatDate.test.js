const { formatDate } = require('../utils/formatDate.js');

test('Formatting date', () => {
	expect(formatDate(new Date('Tue Dec 31 2002 19:27:00 GMT+0100'))).toBe('Tuesday, December 31, 2002, 7:27:00 PM');
});
