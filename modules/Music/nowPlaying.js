const { tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const createBar = require('../../functions/createBar.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'nowplaying',
	helpTitle: 'Now Playing',
	category: 'Music',
	usage: 'nowplaying',
	description: 'Check what\'s currently vibin\'',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['now-playing', 'np', 'current', 'song', 'current-song', 'cs'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				throw new Tantrum(client, 'nowPlaying.js', 'Error on sending nothing playing message', e);
			}
		}

		const song = queue.songs[0];
		const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
		const left = song.duration - seek;

		let nowPlaying = new Discord.MessageEmbed()
			.setTitle('Now Playing')
			.setColor(tofuGreen);
		//.setAuthor(message.client.user.username);

		if (song.duration > 0) {
			nowPlaying.setDescription(`${song.title}\n${song.url}\n\nTime Remaining: ${new Date(left * 1000).toISOString().substr(11, 8)}`);
			nowPlaying.setFooter(`${new Date(seek * 1000).toISOString().substr(11, 8)} [${createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0]}] ${(song.duration == 0 ? ' ◉ LIVE' : new Date(song.duration * 1000).toISOString().substr(11, 8))}`);
		}
		else {
			nowPlaying.setDescription(`${song.title}\n${song.url}`);
		}

		try {
			return message.channel.send(nowPlaying);
		} catch (e) {
			throw new Tantrum(client, 'nowPlaying.js', 'Error on sending nowPlaying embed', e);
		}
	},
};
