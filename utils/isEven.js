const isEven = (n) => {
	if (!n && n !== 0) throw new Error('No param geven');
	if (isNaN(n)) throw new Error('Parameter is not a number');
	return n % 2 === 0 ? true : false;
};

module.exports = {
	isEven
};
