const Tantrum = require('#tantrum');

module.exports = {
	name: 'beep',
	helpTitle: 'Beep',
	category: 'Fun',
	usage: 'beep',
	description: 'Beep boop?',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		message.channel.send('boop').catch(e => {
			throw new Tantrum(client, 'beepboop,js', 'Error on sending boop', e);
		});
	},
};
