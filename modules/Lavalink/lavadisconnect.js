const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'ldisconnect',
	helpTitle: 'Disconnect',
	category: 'Music',
	usage: 'disconnect',
	description: 'Done? Stop the music I suppose',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['ldc'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		try {
			await player.disconnect();
			// await player.destroy(); // apparently this does nothing
			await client.music.destroyPlayer(player.guildId);
			await message.react('👋').catch(e => {
				throw new Tantrum(client, 'disconnect.js', 'Error on sending disconnected reaction', e);
			});
		} catch (e) {
			throw new Tantrum(client, 'disconnect.js', 'Error when disconnecting.', e);
		}
	},
};
