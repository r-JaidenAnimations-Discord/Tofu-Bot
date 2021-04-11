const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME, MAX_PLAYLIST_SIZE, tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const YouTubeAPI = require('simple-youtube-api');
const Tantrum = require('../../functions/tantrum.js');
const { play } = require('../../functions/playbackHandler.js');
const scdl = require('soundcloud-downloader').default;
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'playlist',
	helpTitle: 'Playlist',
	category: 'Music',
	usage: 'playlist [youtube playlist URL]',
	description: 'Play a youtube playlist',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { channel } = message.member.voice;
		const serverQueue = message.client.queue.get(message.guild.id);

		if (!args) {
			try {
				return message.channel.send('You need to provide a playlist URL');
			} catch (e) {
				throw new Tantrum(client, 'playlist.js', 'Error on sending invalid argument message', e);
			}
		}

		if (!channel) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				throw new Tantrum(client, 'playlist.js', 'Error on sending not in VC message', e);
			}
		}

		const permissions = channel.permissionsFor(message.client.user);

		if (!permissions.has('CONNECT')) {
			try {
				return message.channel.send(musicStrings.connectPerm);
			} catch (e) {
				throw new Tantrum(client, 'playlist.js', 'Error on sending no CONNECT permission message', e);
			}
		}

		if (!permissions.has('SPEAK')) {
			try {
				return message.channel.send(musicStrings.speakPerm);
			} catch (e) {
				throw new Tantrum(client, 'playlist.js', 'Error on sending no SPEAK permission message', e);
			}
		}

		if (serverQueue && channel !== message.guild.me.voice.channel) {
			try {
				return message.channel.send(musicStrings.notInSameChannel);
			} catch (e) {
				throw new Tantrum(client, 'playlist.js', 'Error on sending not in same VC message');
			}
		}

		const search = args.join(' ');
		const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
		const url = args[0];
		const urlValid = pattern.test(args[0]);

		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: DEFAULT_VOLUME || 100,
			playing: true
		};

		let playlist = null;
		let videos = [];

		if (urlValid) {
			try {
				playlist = await youtube.getPlaylist(url, { part: 'snippet' });
				videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: 'snippet' });
			} catch (error) {
				console.error(error);
				return message.channel.send('Playlist not found T_T').catch(console.error);////////////////////////////
			}
		} else if (scdl.isValidUrl(args[0])) {
			if (args[0].includes('/sets/')) {
				message.channel.send('Loading playlist...');///////
				playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
				videos = playlist.tracks.map((track) => ({
					title: track.title,
					url: track.permalink_url,
					duration: track.duration / 1000
				}));
			}
		} else {
			try {
				const results = await youtube.searchPlaylists(search, 1, { part: 'snippet' });
				playlist = results[0];
				videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: 'snippet' });
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'playlist.js', 'Error on fetching playlist', error);
				try {
					return message.channel.send(`Error: ${error.message}`)
				} catch (e) {
					console.error(e);
					throw new Tantrum(client, 'playlist.js', 'Error on sending error message', e);
				}
			}
		}

		const newSongs = videos
			.filter((video) => video.title != 'Private video' && video.title != 'Deleted video')
			.map((video) => {
				return (song = {
					title: video.title,
					url: video.url,
					duration: video.durationSeconds
				});
			});

		serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);

		let playlistEmbed = new Discord.MessageEmbed()
			.setTitle(`${playlist.title}`)
			.setDescription(newSongs.map((song, index) => `${index + 1}. ${song.title}`))
			.setURL(playlist.url)
			.setColor(tofuGreen)
			.setTimestamp();

		if (playlistEmbed.description.length >= 2048)
			playlistEmbed.description =
				playlistEmbed.description.substr(0, 2007) + 'Playlist larger than character limit...';

		try {
			message.channel.send(playlistEmbed);
		} catch (e) {
			new Tantrum(client, 'playlist.js', 'Error on sending playlistEmbed', e);
		}

		if (!serverQueue) {
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
					throw new Tantrum(client, 'playlist.js', 'Error on sending can\'t joing VC error', e);
				}
			}
		}
	},
};
