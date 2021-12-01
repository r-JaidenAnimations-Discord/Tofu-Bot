const { tofuOrange, tofuError } = require('#colors');
const Discord = require('discord.js');
const { loadingString } = require('#utils/funnyLoad.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'search',
	helpTitle: 'Search',
	category: 'Music',
	usage: 'search [query]',
	description: 'Don\'t know the exact thing? Search and choose the one you want.',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['src', 'find'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To find a song to play, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] });
		}
		const loadMsg = await message.channel.send(loadingString());

		const tracks = await client.music.rest.loadTracks(`ytsearch:${args.slice(0).join(' ')}`).then(x => x.tracks);

		if (!tracks.length) {
			const noResultsEmbed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setDescription('No matches found!');

			if (loadMsg.deletable) loadMsg.delete();
			return message.channel.send({ embeds: [noResultsEmbed] });
		}

		const searchResultString = tracks.map((t, i) => `${i + 1}) ${t.info.title}`).join('\n');

		if (loadMsg.deletable) loadMsg.delete();
		message.channel.send(`\`\`\`nim\n${searchResultString}\n\`\`\``).then(async msg => {
			const collector = message.channel.createMessageCollector({ time: 10000 });

			collector.on('collect', async ({ content }) => {
				if (content === 'cancel') return collector.stop('cancelled');

				if (!isNaN(content) && parseInt(content) >= 1 && parseInt(content) <= tracks.length) {
					collector.stop('success');
					const index = parseInt(content, 10);
					const track = tracks[index - 1];

					const player = await LavaManager.getPlayer(client, message) || await LavaManager.createPlayer(client, message);

					await player.queue.add([track], { requester: message.author });
					if (!player.playing) player.queue.start();

					return track;

				} else {
					const searchInvalidResponseEmbed = new Discord.MessageEmbed()
						.setColor(tofuOrange)
						.setDescription(`Response has to be a valid number between **1** and **${tracks.length}**!`);
					msg.channel.send({ embeds: [searchInvalidResponseEmbed] });
				}
			});

			collector.on('end', (_, reason) => {
				if (reason === 'time' || reason === 'cancelled') {
					const embed = new Discord.MessageEmbed()
						.setColor(tofuOrange)
						.setDescription('Search cancelled.');
					msg.channel.send({ embeds: [embed] });
				}
			});
		});
	},
};
