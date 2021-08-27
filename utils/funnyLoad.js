const loadings = [
	'Swapping time and space...',
	'Spinning violently around the y-axis...',
	'Bending the spoon...',
	'Have a good day.',
	'The bits are breeding...',
	'Would you prefer chicken, steak, or tofu 😳?',
	'Go ahead, hold your breath ( ͡° ͜ʖ ͡°)',
	'At least you\'re not on hold...',
	'Testing your patience...',
	'The bits are flowing slowly today',
	'My other loading screen is much faster.',
	'Are we there yet?',
	'Counting backwards from Infinity...',
	'Do you come here often?',
	'I feel like im supposed to be loading something...',
	'I swear it\'s almost done...',
	'Where did all the internets go?????',
	'Spinning the birb...',
	'You shall not pass! yet...',
	'How did you get here?',
	'I’ve got problem for your solution...',
	'Constructing additional pylons...',
	'Dividing by zero...',
	'Some days, you just can’t get rid of a bug!',
	'Let\'s hope it\'s worth the wait',
	'Stealing the bird snacks from the drawer...',
	'Ordering 1s and 0s...',
	'Feel free to spin in your chair',
	'Alt+F4 speeds things up :]',
	'You seem like a nice person...',
	'TODO: Insert elevator music',
	'Still faster than Windows update',
	'I love pressing F5. It\'s so refreshing.',
	'CAPS LOCK, preventing Login Since 1980.',
	'PC LOAD LETTER...',
	'Deleting system32...',
	'Oh, are you waiting for me?',
	'🐻 Bear with me...'
];

const loadingString = () => { return `<a:tofuSpin:873583910989205594> ${loadings.randomElement()}` };

module.exports = {
	loadingString
};
