const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'beep',
	helpTitle: 'Beep',
	category: 'Fun',
	usage: 'beep',
	description: 'Beep boop?',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			message.channel.send('boop');
		} catch (e) {
			throw new Tantrum(client, 'beepboop,js', 'Error on sending boop', e);
		}
	},
};
