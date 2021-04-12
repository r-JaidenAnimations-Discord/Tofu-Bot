const { tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;

module.exports = {
	name: 'remove',
	helpTitle: 'Remove',
	category: 'Music',
	usage: 'remove [number]',
	description: 'Remove an item from the queue',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['rm'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.noQueue);
			} catch (e) {
				throw new Tantrum(client, 'remove.js', 'Error on sending no queue message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'remove.js', 'Error on sending have to be in VC message', e);
			}
		}

		if (!args.length) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'remove.js', 'Error on sending invalid argument message', e);
			}
		}

		const arguments = args.join('');
		const songs = arguments.split(',').map((arg) => parseInt(arg));
		let removed = [];

		if (pattern.test(arguments)) {
			queue.songs = queue.songs.filter((item, index) => {
				if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
				else return true;
			});

			try {
				queue.textChannel.send(new Discord.MessageEmbed().setDescription(`Removed ${removed.map((song) => song.title).join('\n')}`).setColor(tofuGreen));
			} catch (e) {
				new Tantrum(client, 'remove.js', 'Error on sending removal embed 1', e);
			}

		} else if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= queue.songs.length) {

			try {
				return queue.textChannel.send(new Discord.MessageEmbed().setDescription(`Removed ${queue.songs.splice(args[0] - 1, 1)[0].title}`).setColor(tofuGreen));
			} catch (e) {
				throw new Tantrum(client, 'remove.js', 'Error on sending removal embed 2', e);
			}
		} else {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'remove.js', 'Error on sending invalid argument message', e);
			}
		}
	},
};
