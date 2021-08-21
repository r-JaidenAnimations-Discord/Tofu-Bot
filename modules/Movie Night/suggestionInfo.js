const { suggestionOpen, suggestionApproved, suggestionDenied, suggestionWatched } = require('#colors');
const Discord = require('discord.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'movieinfo',
	helpTitle: 'Movie Info',
	category: 'Movie Night',
	usage: 'movieinfo [id]',
	description: 'Get the full info of a movie suggestion',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['mvinfo', 'mvsuggestinfo', 'sginfo', 'suggestioninfo'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { jaidenServerID, movieNightSuggestionChannelID } = client.config;

		if (!checkMessageStaff(client, message, true)) return;

		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send('Looks like an invalid ID, check your spelling.');

		const embed = new Discord.MessageEmbed()
			.setTitle(suggestion.movie)
			.setAuthor(suggestion.suggesterTag, suggestion.suggesterAvatar)
			.setFooter(`Suggester ID: ${suggestion.suggester}`)
			.addField('Status:', suggestion.status);

		switch (suggestion.status) {
			case 'Pending Approval':
				embed.setColor(suggestionOpen);
				break;
			case 'Denied':
				embed.setColor(suggestionDenied);
				embed.addFields(
					{ name: 'Reason:', value: suggestion.verdictReason, inline: true },
					{ name: 'Denied by:', value: `<@${suggestion.verdicterID}> (${suggestion.verdicter})`, inline: true }
				);
				break;
			case 'Approved':
				embed.setColor(suggestionApproved);
				embed.addFields(
					{ name: 'Reason:', value: suggestion.verdictReason, inline: true },
					{ name: 'Approved by:', value: `<@${suggestion.verdicterID}> (${suggestion.verdicter})`, inline: true }
				);
				break;
			case 'Watched':
				const formattedWatchDate = new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					weekday: 'long',
				}).format(suggestion.watchedDate);

				embed.setColor(suggestionWatched);
				embed.addFields(
					{ name: 'Marked by:', value: `<@${suggestion.verdicterID}> (${suggestion.verdicter})`, inline: true },
					{ name: 'Watched on:', value: formattedWatchDate, inline: true }
				);
				break;
			default:
				console.log('Error: suggestion.status is not an intended value');
				break;
		}

		embed.addField('Message Link', `[Jump](https://discord.com/channels/${jaidenServerID}/${movieNightSuggestionChannelID}/${suggestion.suggestionMessageID})`);
		try {
			return message.channel.send({ embeds: [embed] });
		} catch (e) { // If you need to log any error put (e) as param and console.error(e) before returning
			console.error(e);
			return message.channel.send('Something went wrong while updating the database.');
		}
	},
};
