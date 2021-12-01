const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'remove',
	helpTitle: 'Remove',
	category: 'Music',
	usage: 'remove [id]',
	description: 'Whoops wrong song',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['rm', 'delete', 'del'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);

		if (player.queue.tracks.length < 2) return message.channel.send('There\'s no more music to remove');

		if (!args[0] ||
			isNaN(args[0]) ||
			Number(args[0]) === 0 ||
			Number(args[0]) >= (player.queue.tracks.length + 1) ||
			Number(args[0]) < 1 ||
			!player.queue.tracks[Number(args[0]) - 1]) return message.channel.send('Invalid argument, if needed, refer to the help command.');
		// Be the developer your linter thinks you are (edit: not anymore)

		await player.queue.remove(Number(args[0]) - 1);

		const removedEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(`Removed [${success.title}](${success.uri}) [<@${success.requester}>]`);

		message.channel.send({ embeds: [removedEmbed] });
	},
};
