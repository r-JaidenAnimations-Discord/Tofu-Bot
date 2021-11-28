const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'clearqueue',
	helpTitle: 'Clear Queue',
	category: 'Music',
	usage: 'clearqueue',
	description: 'Clear the queue.',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['clear-queue', 'cq', 'clear'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		player.queue.clear();
		await message.react('👌').catch(e => {
			throw new Tantrum(client, 'clearQueue.js', 'Error on reacting queue cleared', e);
		});
	},
};
