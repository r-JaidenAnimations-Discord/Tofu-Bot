const Discord = require('discord.js');
const { tofuGreen } = require('../../config.json');
const { quotes } = require('../../commanddata/jaidenQuoteList.js');

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

		message.channel.send(randomQuoteEmbed);
	},
};