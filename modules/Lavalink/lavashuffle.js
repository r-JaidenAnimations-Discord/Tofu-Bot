const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lshuffle',
	helpTitle: 'Shuffle',
	category: 'Music',
	usage: 'shuffle',
	description: 'Feelin\' random?',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['lrandomize'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		player.queue.shuffle();
		await message.react('🔀').catch(e => {
			throw new Tantrum(client, 'shuffle.js', 'Error sending shuffled message', e);
		});
	},
};
