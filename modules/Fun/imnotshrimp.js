const { shrimpID } = require('#memberIDs');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'imnotshrimp',
	helpTitle: 'I\'m not Shrimp',
	category: 'Fun',
	usage: 'imnotshrimp',
	description: 'Not Shrimp',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['notshrimp'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== shrimpID) return message.channel.send('You are not actually').catch(e => {
			throw new Tantrum(client, 'imnotshrimp.js', 'Error on sending are you shrimp message', e);
		});

		message.channel.send('But you are ;_;').catch(e => {
			throw new Tantrum(client, 'imnotshrimp.js', 'Error on sending a', e);
		});
	},
};
