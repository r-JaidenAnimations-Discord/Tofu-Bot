const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'disconnect',
	helpTitle: 'Disconnect',
	category: 'Music',
	usage: 'disconnect',
	description: 'Done? Stop the music I suppose',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['dc'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		await player.disconnect();
		// await player.destroy(); // apparently this does nothing
		await client.music.destroyPlayer(player.guildId);
		await message.react('👋');
	},
};
