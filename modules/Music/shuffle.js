const { checkMusic, checkQueueExists } = require('../../functions/musicChecks.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'shuffle',
	helpTitle: 'Shuffle',
	category: 'Music',
	usage: 'shuffle',
	description: 'Feelin\' random?',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['randomize'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const success = client.player.shuffle(message);

		if (success) {
			try {
				await message.react('🔀');
			} catch (e) {
				throw new Tantrum(client, 'shuffle.js', 'Error sending shuffled message', e);
			}
		} else {
			throw new Tantrum(client, 'shuffle.js', 'Error on shuffling music', 'No message');
		}
	},
};
