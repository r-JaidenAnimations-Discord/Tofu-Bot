const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'loop',
	helpTitle: 'Loop',
	category: 'Music',
	usage: 'loop',
	description: 'Toggle trough the looping modes',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['lp', 'repeat'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const loopModes = {
			0: 'Looping is now **disabled**',
			1: 'Now looping the **current track.**',
			2: 'Now looping the **queue**'
		}

		const queue = client.player.getQueue(message.guild);

		const loopEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen);

		let loopMode = queue.repeatMode;
		loopMode++;
		if (loopMode > 2) loopMode = 0;
		loopEmbed.setDescription(`${loopModes[loopMode]}`);
		if (!queue.setRepeatMode(loopMode)) throw new Tantrum(client, 'loop.js', 'Error on setting loopMode', queue.repeatMode);
		message.channel.send({ embeds: [loopEmbed] }).catch(e => {
			throw new Tantrum(client, 'loop.js', 'Error on sending loopEmbed', e);
		});
	},
};
