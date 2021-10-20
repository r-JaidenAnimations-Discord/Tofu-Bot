const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lnightcore',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'nightcore',
	description: 'Uguuuuuuuu...',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['nc'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;
		// client.music.filters.timescale = (client.music.nightcore = !client.music.nightcore)
		// await createQueue().filters.timescale // = (client.music.nightcore = !client.music.nightcore)
		// 	? { speed: 1.125, pitch: 1.125, rate: 1 }
		// 	: undefined;

		const player = await LavaManager.getPlayer(client, message);
		player.filters.timescale = (player.nightcore = !player.nightcore)
			? { speed: 1.5, pitch: 1.5, rate: 1 }
			: undefined;
		await player.setFilters();
		return message.reply(`${player.nightcore ? 'Enabled' : 'Disabled'} nightcore`); // todo embed
	},
};
