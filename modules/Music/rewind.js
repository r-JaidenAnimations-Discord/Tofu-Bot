const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'rewind',
	helpTitle: 'Rewind',
	category: 'Music',
	usage: 'rewind',
	description: 'Go back to the start of the current track',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['rew'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		if (!player) return;

		if (await player.seek(0)) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'rewind.js', 'Error on reacting', e);
			});
		}
	},
};
