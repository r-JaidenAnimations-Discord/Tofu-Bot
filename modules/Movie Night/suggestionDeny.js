const { suggestionDenied } = require('#colors');
const { MessageEmbed } = require('discord.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'denymovie',
	helpTitle: 'Deny Movie',
	category: 'Movie Night',
	usage: 'denymovie [id] (reason)',
	description: 'Deny a movie',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['denymv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID } = client.config;

		if (!checkMessageStaff(client, message, true)) return;

		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');
		const verdictReason = args.slice(1).join(' ') || 'No reason specified';

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send('Looks like an invalid ID, check your spelling.');

		const suggestionMessageID = await suggestion.suggestionMessageID;

		const newData = {
			status: 'Denied',
			verdicter: message.author.username,
			verdicterID: message.author.id,
			verdictReason
		};
		try {
			await suggestion.update(newData);
			const denialEmbed = new MessageEmbed()
				.setColor(suggestionDenied)
				.setTitle(`**${await suggestion.movie}**`)
				.setAuthor(suggestion.suggesterTag, suggestion.suggesterAvatar)
				// .setDescription(`Suggested by <@${suggestion.suggester}>`)
				.addFields(
					{ name: 'Status:', value: suggestion.status },
					{ name: `Reason from ${suggestion.verdicter}`, value: suggestion.verdictReason }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				const suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit({ embeds: [denialEmbed] });
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
