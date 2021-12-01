const { tofuOrange } = require('#colors');
const { MessageEmbed } = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'pause',
	helpTitle: 'Pause',
	category: 'Music',
	usage: 'pause',
	description: 'brb hold on',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);
		if (!player) return;

		if (player.paused) {
			const alreadyPausedEmbed = new MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already paused!');
			return message.channel.send({ embeds: [alreadyPausedEmbed] });
		}

		await player?.pause();
		await message.react('⏸');
	},
};
