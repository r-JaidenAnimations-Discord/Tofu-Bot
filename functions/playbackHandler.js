const { STAY_TIME, tofuGreen, tofuOrange } = require('../config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const scdl = require('soundcloud-downloader').default;

module.exports = {
	async play(song, message) {
		const { SOUNDCLOUD_CLIENT_ID } = require('../config.json');

		let config;

		try {
			config = require('../config.json');
		} catch (error) {
			config = null;
		}

		const PRUNING = config.PRUNING;

		const queue = message.client.queue.get(message.guild.id);

		//TODO Rework auto leave system
		if (!song) {
			setTimeout(function() {
				if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
				queue.channel.leave();
				queue.textChannel.send(new Discord.MessageEmbed().setDescription('I left the voice channel because I was inactive for too long.').setColor(tofuOrange));
			}, STAY_TIME * 1000);
			//queue.textChannel.send('❌ Music queue ended.').catch(console.error);
			return message.client.queue.delete(message.guild.id);
		}

		let stream = null;
		let streamType = song.url.includes('youtube.com') ? 'opus' : 'ogg/opus';

		try {
			if (song.url.includes('youtube.com')) {
				stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
			} else if (song.url.includes('soundcloud.com')) {
				try {
					stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUD_CLIENT_ID);
				} catch (error) {
					stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUD_CLIENT_ID);
					streamType = 'unknown';
				}
			}
		} catch (error) {
			if (queue) {
				queue.songs.shift();
				module.exports.play(queue.songs[0], message);
			}

			console.error(error);
			return message.channel.send(`Error: ${error}`);
		}

		queue.connection.on('disconnect', () => message.client.queue.delete(message.guild.id));

		const dispatcher = queue.connection
			.play(stream, { type: streamType })
			.on('finish', () => {
				//if (collector && !collector.ended) collector.stop();

				if (queue.loop) {
					// if loop is on, push the song back at the end of the queue
					// so it can repeat endlessly
					let lastSong = queue.songs.shift();
					queue.songs.push(lastSong);
					module.exports.play(queue.songs[0], message);
				} else {
					// Recursively play the next song
					queue.songs.shift();
					module.exports.play(queue.songs[0], message);
				}
			})
			.on('error', (err) => {
				console.error(err);
				queue.songs.shift();
				module.exports.play(queue.songs[0], message);
			});
		dispatcher.setVolumeLogarithmic(queue.volume / 100);

		try {
			var playingMessage = await queue.textChannel.send(new Discord.MessageEmbed().setTitle('Now playing').setDescription(`[${song.title}](${song.url}) [<@${song.requester}>]`).setColor(tofuGreen));
		} catch (error) {
			console.error(error);
		}

		//on end of song
		setTimeout(() => {
			if (PRUNING && playingMessage && !playingMessage.deleted) {
				playingMessage.delete({ timeout: 3000 }).catch(console.error);
			}
		}, song.duration * 1000);

	}
};
