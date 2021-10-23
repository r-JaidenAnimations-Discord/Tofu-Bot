const { shrimpID } = require('#memberIDs');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'imnotshrimp',
	helpTitle: 'I\'m not Shrimp',
	category: 'Fun',
	usage: 'imnotshrimp',
	description: 'Not Shrimp',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['notshrimp'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== shrimpID) return message.channel.send('You are not actually');

		message.channel.send('But you are ;_;');
	},
};
