const firesObjectifier = (num) => {
	if (isNaN(num)) throw new Error('Given value is not a number');

	const rules = new Intl.PluralRules('en', {
		type: 'ordinal'
	});
	const suffixes = {
		one: 'st',
		two: 'nd',
		few: 'rd',
		other: 'th'
	};
	const suffix = suffixes[rules.select(num)];
	return `${num.toString().padStart(2, '0')}${suffix}`;
};

module.exports = {
	firesObjectifier
};
