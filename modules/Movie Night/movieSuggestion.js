//const { movieNightSuggestionChannelID, tofuBlue, fingerupvote, fingerdownvote } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'suggestmovie',
	helpTitle: 'Suggest Movie',
	category: 'Movie Night',
	usage: 'suggestmovie [movie]',
	description: 'Suggest a movie to play at movie night',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	aliases: ['suggest-movie', 'moviesuggestion', 'movie-suggestion'],
	cooldown: 86400,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID, tofuBlue, fingerupvote, fingerdownvote } = client.config;

		let movie = args.slice(0).join(' ');
		if (!movie) {
			return message.reply('So how about sugggesting a movie instead of just sending a useless command?');
		}
		const suggestionEmbed = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
			.setTitle(movie)
			//	.setDescription(`Suggested by ${message.author}`)
			.setTimestamp();

		try {
			client.channels.cache.get(movieNightSuggestionChannelID).send(suggestionEmbed).then(async suggestionEmbed => {
				await suggestionEmbed.react(fingerupvote);
				await suggestionEmbed.react(fingerdownvote);
			});
			await message.react('✅');
			message.channel.send('Your movie suggestion was registered, thank you!');
		} catch (e) {
			throw new Tantrum(client, 'movieSuggestion.js', 'Error on registering a movie suggestion', e);
		}
	},
};
