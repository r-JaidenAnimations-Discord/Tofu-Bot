const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'skip',
	helpTitle: 'Skip',
	category: 'Music',
	usage: 'skip',
	description: 'Skip what\'s playing. Maybe the cringe factor was too high',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['sk', 'next'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const success = client.player.skip(message);

		if (success) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'skip.js', 'Error on sending skip message', e);
			});
		} else {
			throw new Tantrum(client, 'skip.js', 'Error on skipping music', 'No message');
		}
	},
};
