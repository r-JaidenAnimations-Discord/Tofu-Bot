const { teraID, retainedID, maxID, shrimpID, maidID } = require('../../config.json');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'a',
	helpTitle: 'a',
	category: 'Fun',
	usage: 'a',
	description: 'Shrimp',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID && message.author.id !== shrimpID && message.author.id !== maidID) {
			try {
				return message.channel.send('ahahahhahahah are you shrimp? Only the all mighty shrimp can use this all mighty command!');
			} catch (e) {
				throw new Tantrum(client, 'a.js', 'Error on sending are you shrimp message', e);
			}
		}

		try {
			message.channel.send('a.');
		} catch (e) {
			//return handleError(client, 'a.js', 'Error on sending a', e);
			throw new Tantrum(client, 'a.js', 'Error on sending a', e);
		}
	},
};
