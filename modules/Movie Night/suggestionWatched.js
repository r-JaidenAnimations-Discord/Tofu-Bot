const { suggestionWatched } = require('#colors');
const Discord = require('discord.js');
const { checkBanStaff } = require('#functions/staffChecks.js');

module.exports = {
	name: 'watchedmovie',
	helpTitle: 'Watch Movie',
	category: 'Movie Night',
	usage: 'watchedmovie [id]',
	description: 'Mark a movie as watched',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['watchmv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID } = client.config;

		if (!checkBanStaff(client, message)) return;

		let movieID = args[0];
		if (!movieID) return message.channel.send('Invalid arguments');

		let suggestionItem = await client.movieSuggestions.findOne({ where: { id: movieID } });

		if (!suggestionItem) return message.channel.send('Looks like an invalid ID, check your spelling');
		let suggestionMessageID = await suggestionItem.get('suggestionMessageID');

		const affectedRows = await client.movieSuggestions.update({
			status: 'Watched',
			verdicter: message.author.username,
			verdicterID: message.author.id,
		}, { where: { id: movieID } });
		if (affectedRows > 0) {
			// I have to refetch the suggestion to get it's new info
			let suggestion = await client.movieSuggestions.findOne({ where: { id: movieID } });

			const watchedEmbed = new Discord.MessageEmbed()
				.setColor(suggestionWatched)
				.setTitle(`**${await suggestion.get('movie')}**`)
				.setDescription(`Suggested by <@${suggestion.get('suggester')}>`)
				.addFields(
					{ name: 'Status:', value: suggestion.get('status') },
					{ name: 'Marked by:', value: suggestion.get('verdicter') }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				let suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit(watchedEmbed);
				await message.react('✅');
			} catch (e) {
				message.channel.send('Couldn\'t update the suggestion message, maybe it was deleted?');
			}
		} else {
			return message.channel.send('Something went wrong while updating the database.');
		}
	},
};
