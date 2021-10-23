module.exports = {
	name: 'beep',
	helpTitle: 'Beep',
	category: 'Fun',
	usage: 'beep',
	description: 'Beep boop?',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	cooldown: 5,
	execute: async function(client, message, args) {
		message.channel.send('boop');
	},
};
