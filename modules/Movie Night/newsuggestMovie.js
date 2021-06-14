const { suggestionOpen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkBanStaff } = require('#functions/staffChecks.js');

module.exports = {
	name: 'suggestmovie',
	helpTitle: 'Suggest Movie',
	category: 'Movie Night',
	usage: 'suggestmovie [movie]',
	description: 'Suggest a movie to play at movie night',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['suggest-movie', 'moviesuggestion', 'movie-suggestion'],
	cooldown: 86400,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID, fingerupvote, fingerdownvote } = client.config;

		if (!checkBanStaff(client, message)) return;

		let movie = args.slice(0).join(' ');
		if (!movie) {
			return message.reply('So how about sugggesting a movie instead of just sending a useless command?');
		}
		const suggestionEmbed = new Discord.MessageEmbed()
			.setColor(suggestionOpen)
			.setTitle('Loading Suggestion')
			.setTimestamp();

		try {
			const suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).send(suggestionEmbed);
			const suggestion = await client.movieSuggestions.create({
				movie: movie,
				suggester: message.author.id,
				status: 'Pending Approval',
				suggestionMessageID: suggestionEmbed.id,
				verdictReason: 'null',
				verdicter: 'null'
			});
			
			if (suggestion) {
				const populatedEmbed = new Discord.MessageEmbed()
					.setColor(suggestionOpen)
					.setTitle(`**${suggestion.get('movie')}**`)
					.setDescription(`Suggested by <@${suggestion.get('suggester')}>`)
					.addField('Status:', suggestion.get('status'))
					.setFooter(`Suggestion #${suggestion.id}`)
					.setTimestamp();

				suggestionEmbed.edit(populatedEmbed);
				await message.react('✅');
				message.channel.send('Your movie suggestion was registered, thank you!');
				await suggestionEmbed.react(fingerupvote);
				await suggestionEmbed.react(fingerdownvote);
			} else {
				await message.react('❌');
				message.channel.send('Something went wrong, please try again later.');
				return suggestionEmbed.delete();
			}
		} catch (e) {
			throw new Tantrum(client, 'movieSuggestion.js', 'Error on registering a movie suggestion', e);
		}
	},
};
