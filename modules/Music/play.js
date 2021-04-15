const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME, tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const https = require('https');
const Tantrum = require('../../functions/tantrum.js');
const YouTubeAPI = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { play } = require('../../functions/playbackHandler.js');
const scdl = require('soundcloud-downloader').default
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'play',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'play [{song, url}]',
	description: 'Play music',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['p', 'pl'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { channel } = message.member.voice;

		const serverQueue = message.client.queue.get(message.guild.id);

		if (!channel) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending not in VC message', e);
			}
		}

		if (serverQueue && channel !== message.guild.me.voice.channel) {
			try {
				return message.channel.send(musicStrings.notInSameChannel);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending not in same VC message', e);
			}
		}

		if (!args.length) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending invalid argument message', e);
			}
		}

		const permissions = channel.permissionsFor(message.client.user);

		if (!permissions.has('CONNECT')) {
			try {
				return message.channel.send(musicStrings.connectPerm);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending no CONNECT permission message', e);
			}
		}

		if (!permissions.has('SPEAK')) {
			try {
				return message.channel.send(musicStrings.speakPerm);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending no SPEAK permission message', e);
			}
		}

		const search = args.join(' ');
		const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
		const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
		const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
		const url = args[0];
		const urlValid = videoPattern.test(args[0]);

		// Start the playlist if playlist url was provided
		if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
			return message.client.commands.get('playlist').execute(client, message, args);
		} else if (scdl.isValidUrl(url) && url.includes('/sets/')) {
			return message.client.commands.get('playlist').execute(client, message, args);
		}

		if (mobileScRegex.test(url)) {
			try {
				https.get(url, function(res) {
					if (res.statusCode == '302') {
						return message.client.commands.get('play').execute(client, message, [res.headers.location]);
					} else {
						try {
							return message.channel.send('No content could be found at that url.');
						} catch (e) {
							console.error(e);
							throw new Tantrum(client, 'play.js', 'Error on sending no content for URL message', e);
						}
					}
				});
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'play.js', 'Error on retrieving music', error);
				try {
					return message.channel.send(`Error: \`${error.message}\``);
				} catch (e) {
					throw new Tantrum(client, 'play.js', 'Error on sending error message', e);
				}
			}
			try {
				return message.channel.send('Following URL redirection...');
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending URL redirect message', e);
			}
		}

		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: DEFAULT_VOLUME || 100,
			playing: true
		};

		let songInfo = null;
		let song = null;

		if (urlValid) {
			try {
				songInfo = await ytdl.getInfo(url);
				song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
					duration: songInfo.videoDetails.lengthSeconds,
					requester: message.author.id
				};
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'play.js', 'Error on retrieving music', error);
				try {
					return message.channel.send(`Error: \`${error.message}\``);
				} catch (e) {
					throw new Tantrum(client, 'play.js', 'Error on sending error message', e);
				}
			}
		} else if (scRegex.test(url)) {
			try {
				const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
				song = {
					title: trackInfo.title,
					url: trackInfo.permalink_url,
					duration: Math.ceil(trackInfo.duration / 1000),
					requester: message.author.id
				};
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'play.js', 'Error on retrieving music', error);
				try {
					return message.channel.send(`Error: \`${error.message}\``);
				} catch (e) {
					throw new Tantrum(client, 'play.js', 'Error on sending error message', e);
				}
			}
		} else {
			try {
				const results = await youtube.searchVideos(search, 1, { part: 'snippet' });
				songInfo = await ytdl.getInfo(results[0].url);
				song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
					duration: songInfo.videoDetails.lengthSeconds,
					requester: message.author.id
				};
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'play.js', 'Error on retrieving music', error);
				try {
					return message.channel.send(`Error: \`${error.message}\``);
				} catch (e) {
					throw new Tantrum(client, 'play.js', 'Error on sending error message', e);
				}
			}
		}

		if (serverQueue) {
			serverQueue.songs.push(song);

			try {
				return serverQueue.textChannel.send(new Discord.MessageEmbed().setDescription(`Queued [${song.title}](${song.url}) [${message.author}]`).setColor(tofuGreen));
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending added to queue embed', e);
			}

		}

		queueConstruct.songs.push(song);
		message.client.queue.set(message.guild.id, queueConstruct);

		try {
			queueConstruct.connection = await channel.join();
			await queueConstruct.connection.voice.setSelfDeaf(true);
			play(queueConstruct.songs[0], message);
		} catch (error) {
			console.error(error);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			new Tantrum(client, 'play.js', 'Error on joining channel', error);
			try {
				return message.channel.send(`Could not join the channel: ${error}`);
			} catch (e) {
				throw new Tantrum(client, 'play.js', 'Error on sending can\'t joing VC error', e);
			}
		}
	},
};
