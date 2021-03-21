const Discord = require('discord.js');
const { tofuGreen } = require('../../config.json');
const { quotes } = require('../../commanddata/jaidenQuoteList.js');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = {
	name: 'quote',
	helpTitle: 'Jaiden Quote',
	category: 'Fun',
	usage: 'quote',
	description: 'Send a random quote from Jaiden',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['jaidenquote', 'jquote'],
	cooldown: 3,
	execute: async function(client, message, args) {
		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		
		const randomQuoteEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(randomQuote);

			try {
				message.channel.send(randomQuoteEmbed);
			} catch (e) {
				return handleError(client, 'jaidenQuote.js', 'Error on sending randomQuoteEmbed', e);
			}
	},
};