const { tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { checkMusic, checkQueueExists } = require('../../functions/musicChecks.js');
const createBar = require('../../functions/createBar.js');
const { humanReadableDuration } = require('../../functions/buildTimeString.js');

module.exports = {
	name: 'nowplaying',
	helpTitle: 'Now Playing',
	category: 'Music',
	usage: 'nowplaying',
	description: 'Check what\'s that vibing choon',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['now-playing', 'np', 'currentsong', 'currentsong', 'cs'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		// In between songs, there is no now playing. In that case, return to avoid erroring out.
		if (!client.player.nowPlaying(message)) return;

		const track = client.player.nowPlaying(message);
		const queue = client.player.getQueue(message);

		let totalTrackTime = queue.playing.durationMS;
		let currentTime = queue.currentStreamTime;

		let humanCurrentTime = humanReadableDuration(currentTime);
		let humanTotalTime = humanReadableDuration(totalTrackTime);

		//const filters = [];

		//Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

		//message.channel.send(track.durationMS)

		const nowPlayingEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`)
			//.setFooter(client.player.createProgressBar(message, { timecodes: true, length: 20 }));
			.setFooter(`${createBar(totalTrackTime, currentTime, 20)[0]} ${humanCurrentTime} / ${humanTotalTime}`)

		try {
			message.channel.send(nowPlayingEmbed);
		} catch (e) {
			throw new Tantrum(client, 'nowPlaying.js', 'Error on sending nowPlayingEmbed', e);
		}
	},
};
