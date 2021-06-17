const { suggestionApproved } = require('#colors');
const Discord = require('discord.js');
const { checkBanStaff } = require('#functions/staffChecks.js');

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

		if (!checkBanStaff(client, message)) return;

<<<<<<< Updated upstream
		const id = parseInt(args[0]);
        if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');
        const reason = args.slice(1).join(' ');
=======
<<<<<<< Updated upstream
		let movieID = args[0];
		let reason = args.slice(1).join(' ');
		if (!movieID) return message.channel.send('Invalid arguments');
		if (!reason) reason = 'No reason specified';
=======
		const id = parseInt(args[0]);
		if (!args[0] || isNaN(id)) return message.channel.send('Please specify a valid suggestion ID.');
		const verdictReason = args.slice(1).join(' ') || 'No reason specified';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

		const suggestion = await client.movieSuggestions.findOne({ where: { id } });
		if (!suggestion) return message.channel.send(`Looks like an invalid ID, check your spelling.`);

		let suggestionMessageID = await suggestion.suggestionMessageID;

		let newData = {
			status: 'Approved',
<<<<<<< Updated upstream
			verdicter: message.author.username
		};
		if (reason) newData.reason = reason;
		const affectedRows = await suggestion.update(newData);

		if (affectedRows > 0) {
=======
			verdicter: message.author.username,
			verdicterID: message.author.id,
<<<<<<< Updated upstream
			verdictReason: reason
		}, { where: { id: movieID } });
		if (affectedRows > 0) {
			// I have to refetch the suggestion to get it's new info
			let suggestion = await client.movieSuggestions.findOne({ where: { id: movieID } });

=======
			verdictReason
		};
		try {
			await suggestion.update(newData);
>>>>>>> Stashed changes
>>>>>>> Stashed changes
			const approvalEmbed = new Discord.MessageEmbed()
				.setColor(suggestionApproved)
				.setTitle(`**${await suggestion.movie}**`)
				.setDescription(`Suggested by <@${suggestion.suggester}>`)
				.addFields(
					{ name: 'Status:', value: suggestion.status },
					{ name: `Reason from ${suggestion.verdicter}`, value: suggestion.verdictReason }
				)
				.setFooter(`Suggestion #${suggestion.id}`)
				.setTimestamp();

			try {
				let suggestionEmbed = await client.channels.cache.get(movieNightSuggestionChannelID).messages.fetch(suggestionMessageID);
				if (suggestionEmbed) suggestionEmbed.edit(approvalEmbed);
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
