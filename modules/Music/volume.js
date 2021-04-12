const { tofuGreen, tofuError } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings, permissionsErrs } = require('../../commanddata/strings.json');

module.exports = {
	name: 'volume',
	helpTitle: 'Volume',
	category: 'Music',
	usage: 'volume',
	description: 'Change the volume',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['vol'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			try {
				return message.channel.send(permissionsErrs.MANAGE_MESSAGES);
			} catch (e) {
				throw new Tantrum(client, 'volume.js', 'Error on sending permission error', e);
			}
		}

		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'volume.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'volume.js', 'Error on sending have to be in VC message', e);
			}
		}

		if (!args[0]) {
			try {
				return message.channel.send(new Discord.MessageEmbed().setDescription(`The current volume is: **${queue.volume}%**`).setColor(tofuGreen));
			} catch (e) {
				throw new Tantrum(client, 'volume.js', 'Error on sending current volume embed', e);
			}
		}

		if (isNaN(args[0])) {
			try {
				return message.channel.send(new Discord.MessageEmbed().setDescription('That\'s not a number, give me a number.').setColor(tofuError));
			} catch (e) {
				throw new Tantrum(client, 'volume.js', 'Error on sending not a number embed', e);
			}
		}

		if (Number(args[0]) > 100 || Number(args[0]) < 0) {
			try {
				return message.channel.send('Ah yes, very clever. I\'m only accepting values between 0 and 100');
			} catch (e) {
				throw new Tantrum(client, 'volume.js', 'Error on sending not a number message', e);
			}
		}

		queue.volume = args[0];
		queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

		try {
			return queue.textChannel.send(new Discord.MessageEmbed().setDescription(`Volume set to: **${args[0]}%**`).setColor(tofuGreen));
		} catch (e) {
			throw new Tantrum(client, 'volume.js', 'Error on sending set volume embed', e);
		}
	},
};
