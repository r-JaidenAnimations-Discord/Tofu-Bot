const { tofuGreen, tofuError } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const splitLyrics = require('../../functions/pagination.js');
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
		let fetchSuccessful = false;
		const title = queue.songs[0].title;

		try {
			message.channel.startTyping();
			lyrics = await lyricsFinder(queue.songs[0].title, '');
			fetchSuccessful = true;
			if (!lyrics) {
				lyrics = `No lyrics found for ${title}.`;
				fetchSuccessful = false;
			}
		} catch (error) {
			lyrics = `No lyrics found for ${title}.`;
			fetchSuccessful = false;
		}

		let splitLyricsReturn = undefined;
		if (/*lyricsEmbed.description*/lyrics.length >= 2048) {
			//lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
			splitLyricsReturn = splitLyrics.chunk(lyrics, 1024);
		}

		let lyricsEmbed = new Discord.MessageEmbed()
			.setTitle(`${title} - Lyrics`)
			.setDescription(splitLyricsReturn[0])
			.setColor(fetchSuccessful === true ? tofuGreen : tofuError)
			.setTimestamp();

		if (lyrics.length >= 2048) {
			lyricsEmbed.setFooter(`Page 1 of ${splitLyricsReturn.length}`);
		}
		try {
			message.channel.stopTyping();
			let sentEmbed = await message.channel.send(lyricsEmbed);
			if (splitLyricsReturn.length > 1) await splitLyrics.pagination(sentEmbed, message.author, splitLyricsReturn);
			return;
		} catch (e) {
			throw new Tantrum(client, 'lyrics.js', 'Error on sending lyricsEmbed', e);
		}
	},
};
