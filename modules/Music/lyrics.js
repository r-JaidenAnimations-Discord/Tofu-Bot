const { tofuRed } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const lyricsFinder = require('lyrics-finder');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'lyrics',
	helpTitle: 'Lyrics',
	category: 'Music',
	usage: 'lyrics',
	description: 'Get the lyrics of the currently playing song',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['lyr'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				throw new Tantrum(client, 'lyrics.js', 'Error on sending nothing playing message', e);
			}
		}

		let lyrics = null;
		const title = queue.songs[0].title;
		try {
			lyrics = await lyricsFinder(queue.songs[0].title, '');
			if (!lyrics) lyrics = `No lyrics found for ${title}.`;
		} catch (error) {
			lyrics = `No lyrics found for ${title}.`;
		}

		let lyricsEmbed = new Discord.MessageEmbed()
			.setTitle(`${title} - Lyrics`)
			.setDescription(lyrics)
			.setColor(tofuRed)
			.setTimestamp();

		if (lyricsEmbed.description.length >= 2048)
			lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
		try {
			return message.channel.send(lyricsEmbed);
		} catch (e) {
			throw new Tantrum(client, 'lyrics.js', 'Error on sending lyricsEmbed', e);
		}
	},
};
