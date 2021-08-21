const { suggestionApproved } = require('#colors');
const Discord = require('discord.js');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'approvemovie',
	helpTitle: 'Approve Movie',
	category: 'Movie Night',
	usage: 'approvemovie [id] (reason)',
	description: 'Approve a movie',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['approvemv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { movieNightSuggestionChannelID } = client.config;

		if (!checkBanStaff(client, message, true)) return;

		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');
		const verdictReason = args.slice(1).join(' ') || 'No reason specified';

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send('Looks like an invalid ID, check your spelling.');

		let suggestionMessageID = await suggestion.suggestionMessageID;

		let newData = {
			status: 'Approved',
			verdicter: message.author.username,
			verdicterID: message.author.id,
			verdictReason
		};
		try {
			await suggestion.update(newData);
			const approvalEmbed = new Discord.MessageEmbed()
				.setColor(suggestionApproved)
				.setTitle(`**${await suggestion.movie}**`)
				// .setDescription(`Suggested by <@${suggestion.suggester}>`)
				.setAuthor(suggestion.suggesterTag, suggestion.suggesterAvatar)
				.addFields(
					{ name: 'Status:', value: suggestion.status },
					{ name: `Reason from ${suggestion.verdicter}`, value: suggestion.verdictReason }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				let suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit({ embeds: [approvalEmbed] });
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
