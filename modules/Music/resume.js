const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'resume',
	helpTitle: 'Resume',
	category: 'Music',
	usage: 'resume',
	description: 'Alr back, go on',
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

		if (!player.paused) {
			const alreadyPlayingEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already playing!');
			return message.channel.send({ embeds: [alreadyPlayingEmbed] });
		}

		player.resume();
		await message.react('▶️');
	},
};
