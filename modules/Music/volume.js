const { tofuGreen, tofuOrange } = require('#colors');
const { MessageEmbed } = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'volume',
	helpTitle: 'Volume',
	category: 'Music',
	usage: 'volume [number between 0 and 100]',
	description: 'Change the player\'s volume',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['vol'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMessageStaff(client, message, true)) return;

		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		const volumeEmbed = new MessageEmbed();

		if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('The value you entered is not a number');
			return message.channel.send({ embeds: [volumeEmbed] });
		}

		if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('Please enter a number between 1 and 100!');
			return message.channel.send({ embeds: [volumeEmbed] });
		}

		await player.setVolume(parseInt(args[0]));
		volumeEmbed.setColor(tofuGreen);
		volumeEmbed.setDescription(`Volume set to **${parseInt(args[0])}%**!`);
		message.channel.send({ embeds: [volumeEmbed] });
	},
};
