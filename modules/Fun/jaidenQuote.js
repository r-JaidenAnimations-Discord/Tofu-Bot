const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
//const { handleError } = require('../../functions/errorHandler.js');
const { tofuGreen } = require('../../config.json');
const { quotes } = require('../../commanddata/jaidenQuoteList.js');

module.exports = {
	name: 'quote',
	helpTitle: 'Jaiden Quote',
	category: 'Fun',
	usage: 'quote',
	description: 'Send a random quote from Jaiden',
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
			//return handleError(client, 'jaidenQuote.js', 'Error on sending randomQuoteEmbed', e);
			throw new Tantrum(client, 'jaidenQuote.js', 'Error on sending randomQuoteEmbed', e);
		}
	},
};
