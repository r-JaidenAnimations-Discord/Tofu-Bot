const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const createBar = require('#utils/createBar.js');
const { humanReadableDuration } = require('#utils/buildTimeString.js');

module.exports = {
	name: 'nowplaying',
	helpTitle: 'Now Playing',
	category: 'Music',
	usage: 'nowplaying',
	description: 'Check what\'s that vibing choon',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
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

		message.channel.send(nowPlayingEmbed).catch(e => { // TODO: Embedify and test
			throw new Tantrum(client, 'nowPlaying.js', 'Error on sending nowPlayingEmbed', e);
		});
	},
};
