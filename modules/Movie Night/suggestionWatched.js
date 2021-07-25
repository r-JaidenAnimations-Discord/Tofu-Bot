const { suggestionWatched } = require('#colors');
const Discord = require('discord.js');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'watchedmovie',
	helpTitle: 'Watch Movie',
	category: 'Movie Night',
	usage: 'watchedmovie [id]',
	description: 'Mark a movie as watched',
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['watchmv', 'watchedmv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID } = client.config;

		if (!checkBanStaff(client, message)) return;

		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send(`Looks like an invalid ID, check your spelling.`);

		let suggestionMessageID = await suggestion.suggestionMessageID;

		let newData = {
			status: 'Watched',
			verdicter: message.author.username,
			verdicterID: message.author.id,
		};
		try {
			await suggestion.update(newData);
			const watchedEmbed = new Discord.MessageEmbed()
				.setColor(suggestionWatched)
				.setTitle(`**${await suggestion.movie}**`)
				.setDescription(`Suggested by <@${suggestion.suggester}>`)
				.addFields(
					{ name: 'Status:', value: suggestion.status },
					{ name: 'Marked by:', value: suggestion.verdicter }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				let suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit({ embeds: [watchedEmbed] });
				await message.react('✅');
			} catch (e) {
				message.channel.send('Couldn\'t update the suggestion message, maybe it was deleted?');
			}
		} catch (e) { // If you need to log any error put (e) as param and console.error(e) before returning
			console.error(e);
			return message.channel.send('Something went wrong while updating the database.');
		}
	},
};
