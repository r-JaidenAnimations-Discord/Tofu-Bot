const { tofuGreen, tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic } = require('#utils/musicChecks.js');

module.exports = {
	name: 'search',
	helpTitle: 'Search',
	category: 'Music',
	usage: 'search [query]',
	description: 'Don\'t know the exact thing? Search and choose the one you want.',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['src', 'find'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To find a song to play, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] }).catch(e => {
				throw new Tantrum(client, 'search.js', 'Error on sending no query defined message', e);
			});
		}

		const tracks = await client.player.search(args.join(' '), {
			requestedBy: message.author
		}).then(x => x.tracks);
		console.log(tracks)

		const searchResultString = tracks.map((t, i) => `${i + 1}) ${t.title}`).join('\n');

		message.channel.send(`\`\`\`nim\n${searchResultString}\n\`\`\``).catch(e => {
			throw new Tantrum(client, 'searchResults.js', 'Error on sending searchResults', e);
		});

	},
};
