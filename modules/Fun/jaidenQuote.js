const { tofuGreen } = require('#colors');
const { MessageEmbed } = require('discord.js');
const { quotes } = require('#assets/commandQuote/jaidenQuoteList.js');

module.exports = {
	name: 'quote',
	helpTitle: 'Jaiden Quote',
	category: 'Fun',
	usage: 'quote',
	description: 'Send a random quote from Jaiden',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['jaidenquote', 'jquote'],
	cooldown: 3,
	execute: async function(client, message, args) {
		const randomQuote = quotes.randomElement();

		const randomQuoteEmbed = new MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(randomQuote);

		message.channel.send({ embeds: [randomQuoteEmbed] });
	},
};
