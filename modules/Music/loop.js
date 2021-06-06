//const { tofuGreen } = require('../../config.json');
const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#functions/musicChecks.js');

module.exports = {
	name: 'loop',
	helpTitle: 'Loop',
	category: 'Music',
	usage: 'loop (queue)',
	description: 'Enable or disable looping',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['lp', 'repeat'],
	cooldown: 0,
	execute: async function(client, message, args) {
		// const { tofuGreen } = client.config;

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		let loopEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen);

		if (args.join(' ').toLowerCase() === 'queue') {
			if (client.player.getQueue(message).loopMode) {
				try {
					client.player.setLoopMode(message, false);
					loopEmbed.setDescription('Looping is now **disabled.**');
					message.channel.send(loopEmbed);
					return;
				} catch (e) {
					throw new Tantrum(client, 'loop.js', 'Error on disabling loop', e);
				}
			} else {
				try {
					client.player.setLoopMode(message, true);
					loopEmbed.setDescription('Now looping the **queue.**');
					message.channel.send(loopEmbed);
					return;
				} catch (e) {
					throw new Tantrum(client, 'loop.js', 'Error on looping queue', e);
				}
			}
		} else {
			if (client.player.getQueue(message).repeatMode) {
				try {
					client.player.setRepeatMode(message, false);
					loopEmbed.setDescription('Looping is now **disabled.**');
					message.channel.send(loopEmbed);
					return;
				} catch (e) {
					throw new Tantrum(client, 'loop.js', 'Error on disabling loop', e);
				}
			} else {
				try {
					client.player.setRepeatMode(message, true);
					loopEmbed.setDescription('Now looping the **current track.**');
					message.channel.send(loopEmbed);
					return;
				} catch (e) {
					throw new Tantrum(client, 'loop.js', 'Error on looping song', e);
				}
			}
		}
	},
};
