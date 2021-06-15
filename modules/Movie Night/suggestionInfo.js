const { suggestionOpen, suggestionApproved, suggestionDenied, suggestionWatched } = require('#colors');
const Discord = require('discord.js');
const { checkBanStaff } = require('#functions/staffChecks.js');

module.exports = {
	name: 'movieinfo',
	helpTitle: 'Movie Info',
	category: 'Movie Night',
	usage: 'movieinfo [id]',
	description: 'Get the full info of a movie suggestion',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['mvinfo', 'mvsuggestinfo', 'sginfo'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { jaidenServerID, movieNightSuggestionChannelID } = client.config;

		if (!checkBanStaff(client, message)) return;

		let movieID = args[0];
		if (!movieID) return message.channel.send('Invalid arguments');

		let suggestionItem = await client.movieSuggestions.findOne({ where: { id: movieID } });

		if (!suggestionItem) return message.channel.send('Looks like an invalid ID, check your spelling');

		let embed = new Discord.MessageEmbed()
			.setTitle(suggestionItem.movie)
			.addFields(
				{ name: 'Suggested by:', value: `<@${suggestionItem.suggester}>` },
				{ name: 'Status:', value: suggestionItem.status }
			);

		switch (suggestionItem.status) {
			case 'Pending Approval':
				embed.setColor(suggestionOpen);
				break;
			case 'Denied':
				embed.setColor(suggestionDenied);
				embed.addFields(
					{ name: 'Reason:', value: suggestionItem.verdictReason },
					{ name: 'Denied by:', value: `<@${suggestionItem.verdicterID}>` }
				);
				break;
			case 'Approved':
				embed.setColor(suggestionApproved);
				embed.addFields(
					{ name: 'Reason:', value: suggestionItem.verdictReason },
					{ name: 'Approved by:', value: `<@${suggestionItem.verdicterID}>` }
				);
				break;
			case 'Watched':
				embed.setColor(suggestionWatched);
				embed.addField('Marked by:', `<@${suggestionItem.verdicterID}>`);
				break;
			default:
				console.log('Error: suggestionItem.status is not an intended value');
				break;
		}

		embed.addField('Message Link', `[Jump](https://discord.com/channels/${jaidenServerID}/${movieNightSuggestionChannelID}/${suggestionItem.suggestionMessageID})`);
		return message.channel.send(embed);

	},
};
