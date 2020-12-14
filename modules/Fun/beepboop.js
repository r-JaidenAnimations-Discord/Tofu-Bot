module.exports = {
	name: 'beep',
	helpTitle: 'Beep',
    category: 'Fun',
    usage: 'beep',
    description: 'Beep boop?',
	isEnabled: true,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		message.channel.send('boop');
	},
};