const { checkMusic, checkQueueExists } = require('../../functions/musicChecks.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'skip',
	helpTitle: 'Skip',
	category: 'Music',
	usage: 'skip',
	description: 'Skip what\'s playing. Maybe the cringe factor was too high',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['sk', 'next'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const success = client.player.skip(message);

		if (success) {
			try {
				await message.react('👌');
			} catch (e) {
				throw new Tantrum(client, 'skip.js', 'Error on sending skip message', e);
			}
		} else {
			throw new Tantrum(client, 'skip.js', 'Error on skipping music', 'No message');
		}
	},
};
