const { suggestionWatched } = require('#colors');
const { MessageEmbed } = require('discord.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');
const { validateDate } = require('#utils/dateValidation.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'watchedmovie',
	helpTitle: 'Watch Movie',
	category: 'Movie Night',
	usage: 'watchedmovie [id] [date]',
	description: 'Mark a movie as watched',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['watchmv', 'watchedmv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID } = client.config;

		if (!checkMessageStaff(client, message, true)) return;

		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');

		if (!args[1] || !validateDate(args[1])) return message.channel.send('Please enter a valid date');

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send('Looks like an invalid ID, check your spelling.');

		const suggestionMessageID = await suggestion.suggestionMessageID;

		const newData = {
			status: 'Watched',
			verdicter: message.author.username,
			verdicterID: message.author.id,
			watchedDate: validateDate(args[1])
		};
		try {
			await suggestion.update(newData);

			const formattedWatchDate = new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
			}).format(suggestion.watchedDate);

			const watchedEmbed = new MessageEmbed()
				.setColor(suggestionWatched)
				.setTitle(`**${await suggestion.movie}**`)
				// .setDescription(`Suggested by <@${suggestion.suggester}>`)
				.setAuthor(suggestion.suggesterTag, suggestion.suggesterAvatar)
				.addFields(
					{ name: 'Status:', value: suggestion.status },
					{ name: 'Marked by:', value: suggestion.verdicter },
					{ name: 'Watched on:', value: formattedWatchDate }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				const suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit({ embeds: [watchedEmbed] });
				await message.react('✅');
			} catch (e) {
				message.channel.send('Couldn\'t update the suggestion message, maybe it was deleted?');
			}
		} catch (e) { // If you need to log any error put (e) as param and console.error(e) before returning
			new Tantrum(client, e);
			return message.channel.send('Something went wrong while updating the database.');
		}
	},
};
