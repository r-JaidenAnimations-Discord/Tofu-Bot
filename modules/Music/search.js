const { YOUTUBE_API_KEY, tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const YouTubeAPI = require('simple-youtube-api');
const Tantrum = require('../../functions/tantrum');
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'search',
	helpTitle: 'Search',
	category: 'Music',
	usage: 'search [query]',
	description: 'Find a specific song and select one to queue up',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['find', 'srch'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args.length) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'search.js', 'Error on sending invalid argument message', e);
			}
		}
		if (message.channel.activeCollector) {
			try {
				return message.channel.send('There\'s already a query running.');
			} catch (e) {
				throw new Tantrum(client, 'search.js', 'Error on sending query already running message', e);
			}
		}

		if (!message.member.voice.channel) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'search.js', 'Error on sending have to be in VC message', e);
			}
		}

		const search = args.join(' ');

		let resultsEmbed = new Discord.MessageEmbed()
			.setTitle(`Results for: ${search}`)
			.setDescription('**Reply with the song number you want to play**')
			.setColor(tofuGreen);

		try {
			const results = await youtube.searchVideos(search, 10);
			results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

			let resultsMessage = await message.channel.send(resultsEmbed);

			function filter(msg) {
				const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
				return pattern.test(msg.content);
			}

			message.channel.activeCollector = true;
			const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
			const reply = response.first().content;

			if (reply.includes(',')) {
				let songs = reply.split(',').map((str) => str.trim());

				for (let song of songs) {
					await message.client.commands
						.get('play')
						.execute(client, message, [resultsEmbed.fields[parseInt(song) - 1].name]);
				}
			} else {
				const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
				message.client.commands.get('play').execute(client, message, [choice]);
			}

			message.channel.activeCollector = false;
			resultsMessage.delete().catch(console.error);
			response.first().delete().catch(console.error);
		} catch (error) {
			console.error(error);
			message.channel.activeCollector = false;
			new Tantrum(client, 'search.js', 'Error on search', error);
			try {
				message.channel.send(`Something went wrong: \`${error.message}\``);
			} catch (e) {
				new Tantrum(client, 'search.js', 'Error on notifying problem to user', e);
			}
		}
	},
};
