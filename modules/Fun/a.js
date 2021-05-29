//const { shrimpID } = require('../../config.json');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'a',
	helpTitle: 'a',
	category: 'Fun',
	usage: 'a',
	description: 'Shrimp',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { shrimpID } = client.config;

		if (message.author.id !== shrimpID) {
			try {
				return message.channel.send('ahahahhahahah are you shrimp? Only the all mighty shrimp can use this almighty command! **vanish**');
			} catch (e) {
				throw new Tantrum(client, 'a.js', 'Error on sending are you shrimp message', e);
			}
		}

		try {
			message.channel.send('a.');
		} catch (e) {
			throw new Tantrum(client, 'a.js', 'Error on sending a', e);
		}
	},
};
