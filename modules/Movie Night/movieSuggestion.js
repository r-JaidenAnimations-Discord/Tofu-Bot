const Discord = require('discord.js');
const { movieNightSuggestionChannelID, tofuBlue, fingerupvote, fingerdownvote, botProfile } = require('../../config.json');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = {
	name: 'suggestmovie',
	helpTitle: 'Suggest Movie',
	category: 'Movie Night',
	usage: 'suggestmovie [movie]',
	description: 'Suggest a movie to play at movie night',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['suggest-movie', 'moviesuggestion', 'movie-suggestion'],
	cooldown: 86400,
	execute: async function(client, message, args) {
		let movie = args.slice(0).join(' ');
		if (!movie) {
			return message.reply('So how about sugggesting a movie instead of just sending a useless command?');
		}
		const suggestionEmbed = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
			.setTitle(movie)
			//.setDescription(`Suggested by ${message.author}`)
			.setTimestamp()
		//	.setFooter(`Suggested by ${message.member.displayName}`);

		try {
			/*client.channels.cache.get(movieNightSuggestionChannelID).send(suggestionEmbed).then(async suggestionEmbed => {
				suggestionEmbed.react(fingerupvote);
				suggestionEmbed.react(fingerdownvote);
			});
			message.react('✅');
			message.channel.send('Your movie suggestion was registered, thank you!');*/
			message.channel.send('We\'re really sorry, but due to Discord\'s TOS, we have to cancel Movie Nights for the forseeable future. Movie suggestions have been closed down and we\'re reevaluating the Movie Night formula.');
			return;
		} catch (e) {
			return handleError(client, 'movieSuggestion.js', 'Error on registering a movie suggestion', e);
		}
	},
};
