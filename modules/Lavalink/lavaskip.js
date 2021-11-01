const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lskip',
	helpTitle: 'Skip',
	category: 'Music',
	usage: 'skip',
	description: 'Skip what\'s playing. Maybe the cringe factor was too high',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['sk', 'next', 's'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		if (player.queue.next()) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'skip.js', 'Error on sending skip message', e);
			});
		} else {
			throw new Tantrum(client, 'skip.js', 'Error on skipping music', 'No message');
		}

	},
};
